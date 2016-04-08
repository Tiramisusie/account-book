/**
 * Created by liangningcong on 16/2/19.
 */
import constant from '../constants/accountConstants'
var EventStore = require('./EventStore');
import {Store, Utils} from '../utils/utils'
import moment from 'moment'

var AccountStore = {
  incomeCount: 0, //一天的总收入
  expendCount: 0, //一天的总支出
  currentDate: new Date(), //当前选择的日期
  modifyIndex: -1,   //需要修改的记录的索引
  modifyType: '',   //需要修改的记录的类型

  addIncome(data, date = new Date()){
    var timeStamp = Utils.getTimeStamp(date),
      oldData = Store.get(timeStamp),
      newData;

    if (!!oldData) {
      oldData.income.push(data);
      newData = oldData;
    } else {
      newData = {income: [data], expend: []};
    }
    Store.set(timeStamp, newData);

    EventStore.emitEvent(constant.ADD_INCOME, data);
  },

  addExpend(data, date = new Date()){
    var timeStamp = Utils.getTimeStamp(date),
      oldData = Store.get(timeStamp),
      newData;

    if (!!oldData) {
      oldData.expend.push(data);
      newData = oldData;
    } else {
      newData = {expend: [data], income: []};
    }
    Store.set(timeStamp, newData);

    EventStore.emitEvent(constant.ADD_EXPEND, data);
  },

  /**
   * 获取需要修改的记录
   * @param type income/expend
   * @param index 要修改的记录的index
   */
  getModifyRecord(type, index){
    let timestamp = Utils.getTimeStamp(this.currentDate),
      localData = Store.get(timestamp);

    this.modifyIndex = index;
    this.modifyType = type;

    EventStore.emitEvent(constant.MODIFY_RECORD, localData[type][index]);
  },

  /**
   * 保存编辑过的记录
   * @param data
   */
  saveModifiedRecord(data){
    let { modifyType, modifyIndex, currentDate } = this;
    let timestamp = Utils.getTimeStamp(this.currentDate),
      localData = Store.get(timestamp);

    localData[modifyType][modifyIndex] = data;

    Store.set(timestamp, localData);
    this.getRecords(currentDate);
  },
  
  deleteOneRecord(type, index){
    let timestamp = Utils.getTimeStamp(this.currentDate),
      localData = Store.get(timestamp);
    
    localData[type].splice(index, 1);
    
    Store.set(timestamp, localData);
    this.getRecords(this.currentDate);
  },

  getRecords(date = new Date()){
    var data = Store.get(Utils.getTimeStamp(date));
    EventStore.emitEvent(constant.GET_RECORDS, data);
  },

  changeDate(date){
    this.currentDate = date;
    EventStore.emitEvent(constant.CHANGE_DATE, date);
  },

  setIncomeCount(num){
    this.incomeCount = num;
    EventStore.emitEvent(constant.INCOME_CHANGE, this.getBalance());
  },

  setExpendCount(num){
    this.expendCount = num;
    EventStore.emitEvent(constant.EXPEND_CHANGE, this.getBalance());
  },

  getBalance(){
    return this.incomeCount - this.expendCount;
  },

  getRangeRecords(start, end){
    let response = [];

    Store.forEach((key, val)=> {
      if( moment(key, 'YYYY-MM-DD').isBetween(start, end) ){
        response.push({
          date: key,
          data: {income: val.income, expend: val.expend}
        });
      }
    });
    
    EventStore.emitEvent(constant.GET_RANGE_RECORDS, response);
  }
};

export default AccountStore;