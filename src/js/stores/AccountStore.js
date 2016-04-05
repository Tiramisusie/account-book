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

  getRecords(date = new Date()){
    var data = Store.get(Utils.getTimeStamp(date));
    EventStore.emitEvent(constant.GET_RECORDS, data);
  },

  changeDate(date){
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