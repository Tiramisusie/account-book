/**
 * Created by liangningcong on 16/2/19.
 */
import constant from '../constants/accountConstants'
var EventStore = require('./EventStore');
import {Store, Utils} from '../utils/utils'
import moment from 'moment'

var API = {
  /**
   * 添加新的记录
   * @param date
   * @param type income/expend
   * @param data
   */
  addRecord(date, type, data){
    return $.ajax({
      url: '/addOneRecord',
      type: 'post',
      dataType: 'json',
      data: {
        date: date,
        type: type,
        data: data
      }
    })
  },

  /**
   * 获取某一天的记录
   * @param date
   * @returns {*}
   */
  getOneDayRecord(date){
    return $.ajax({
      url: '/getOneRecord',
      dataType: 'json',
      data: {
        date: date
      }
    })
  },

  /**
   * 获取某一时间范围内的数据
   * @param start
   * @param end
   * @returns {*}
   */
  getRangeRecords(start, end){
    return $.ajax({
      url: '/getRangeRecords',
      dataType: 'json',
      data: {
        start: start,
        end: end
      }
    })
  },

  /**
   * 保存修改过的记录
   * @param id 要修改的记录的id
   * @param data 修改过的记录所在的数组  
   * @returns {*}
   */
  saveModified(id, data){
    return $.ajax({
      url: '/saveModified',
      type: 'post',
      dataType: 'json',
      data: {
        id: id,
        data: data
      }
    })
  },

  deleteOneRecord(id, data){
    return $.ajax({
      url: '/deleteOne',
      type: 'post',
      dataType: 'json',
      data: {
        id: id,
        data: data
      }
    })
  }
};

var AccountStore = {
  incomeCount: 0, //一天的总收入
  expendCount: 0, //一天的总支出
  currentDate: new Date(), //当前选择的日期
  modifyIndex: -1,   //需要修改的记录的索引
  modifyType: '',   //需要修改的记录的类型
  recordsCache: {},   //当天记录的缓存

  addIncome(data, date = this.currentDate){
    let timeStamp = Utils.getTimeStamp(date);

    API.addRecord(timeStamp, 'income', data)
      .then((res)=>{
        if(!res.err) {
          EventStore.emitEvent(constant.ADD_INCOME, data);
          API.getOneDayRecord(Utils.getTimeStamp(date))
            .then( (res)=>{
              this.recordsCache = res;
            });
        }
      });
  },

  addExpend(data, date = this.currentDate){
    let timeStamp = Utils.getTimeStamp(date);

    API.addRecord(timeStamp, 'expend', data)
      .then((res)=>{
        if(!res.err) {
          EventStore.emitEvent(constant.ADD_EXPEND, data);
          API.getOneDayRecord(Utils.getTimeStamp(date))
            .then( (res)=>{
              this.recordsCache = res;
            });
        }
      });
  },

  /**
   * 获取需要修改的记录
   * @param type income/expend
   * @param index 要修改的记录的index
   */
  getModifyRecord(type, index){
    let localData = this.recordsCache;

    this.modifyIndex = index;
    this.modifyType = type;
    
    let res = {
      modifyType: type,
      modifyContent: localData[type][index]
    };
    
    EventStore.emitEvent(constant.MODIFY_RECORD, res);
  },

  /**
   * 保存编辑过的记录
   * @param data
   */
  saveModifiedRecord(data){
    let { modifyType, modifyIndex } = this,
      localData = this.recordsCache;

    localData[modifyType][modifyIndex] = data;

    API.saveModified(localData._id, localData)
      .then((res)=>{
        if(!res.err){
          EventStore.emitEvent(constant.GET_RECORDS, localData);
        }
      })
  },
  
  deleteOneRecord(type, index){
    let localData = this.recordsCache;

    localData[type].splice(index, 1);

    API.deleteOneRecord(localData._id, localData)
      .then((res)=>{
        if(!res.err){
          EventStore.emitEvent(constant.GET_RECORDS, localData);
        }
      });
  },

  getRecords(date = new Date()){
    API.getOneDayRecord(Utils.getTimeStamp(date))
      .then( (res)=>{
        this.recordsCache = res;
        EventStore.emitEvent(constant.GET_RECORDS, res);
      });

  },

  changeDate(date){
    this.currentDate = date;
    this.getRecords(date);
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
    
    API.getRangeRecords(Utils.getTimeStamp(start), Utils.getTimeStamp(end))
      .then((res)=>{
        res.forEach((obj)=>{
          response.push({
            date: Utils.getTimeStamp(obj.date),
            data: {income: obj.income, expend: obj.expend}
          });
        });

        EventStore.emitEvent(constant.GET_RANGE_RECORDS, response);
      });
  }
};

export default AccountStore;