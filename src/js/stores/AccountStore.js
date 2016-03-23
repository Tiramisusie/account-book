/**
 * Created by liangningcong on 16/2/19.
 */
import constant from '../constants/accountConstants'
var EventStore = require('./EventStore');
import {Store, Utils} from '../utils/utils'

var AccountStore = {
  incomeCount: 0,
  expendCount: 0,

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
    let response = [],
      date;

    Store.forEach((key, val)=> {
      date = key.split('-');  //date = ["yy","MM", "dd"]
      
      if (date[0]*1 >= start.getFullYear() && date[0]*1 <= end.getFullYear()) {
        if (date[1]*1 >= start.getMonth()+1 && date[1]*1 <= end.getMonth()+1) {
          if (date[2]*1 >= start.getDate() && date[2]*1 <= end.getDate()) {
            let income = 0,
              expend = 0;

            val.income.forEach((obj)=>{
              income += obj.money*1;
            });
            val.expend.forEach((obj)=>{
              expend += obj.money*1;
            });

            response.push({
              date: key,
              data: {income: income, expend: expend}
            });
          }
        }
      }
    });
    
    EventStore.emitEvent(constant.GET_RANGE_RECORDS, response);
  }
};

export default AccountStore;