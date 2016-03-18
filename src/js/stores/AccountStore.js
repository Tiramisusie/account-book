/**
 * Created by liangningcong on 16/2/19.
 */
import constant from '../constants/accountConstants'
var EventStore = require('./EventStore');
import { Store, Utils } from '../utils/utils'

var incomeCount = 0,
  expendCount = 0;

var Api = {
    addIncome(data, date){
        var timeStamp = Utils.getTimeStamp(date),
            oldData = Store.get(timeStamp),
            newData;

        if( !!oldData ) {
            oldData.income.push(data);
            newData = oldData;
        } else {
            newData = {income: [data], expend: []};
        }
        Store.set(timeStamp, newData);

        EventStore.emitEvent(constant.ADD_INCOME, data);
    },

    addExpend(data, date){
        var timeStamp = Utils.getTimeStamp(date),
            oldData = Store.get(timeStamp),
            newData;

        if( !!oldData ) {
            oldData.expend.push(data);
            newData = oldData;
        } else {
            newData = {expend: [data], income: []};
        }
        Store.set(timeStamp, newData);

        EventStore.emitEvent(constant.ADD_EXPEND, data);
    }
};

var AccountStore = {
    addIncome(data, date=new Date()){
        Api.addIncome(data, date);
    },
    addExpend(data, date=new Date()){
        Api.addExpend(data, date);
    },
    getRecords(date=new Date()){
        var data = Store.get(Utils.getTimeStamp(date));
        EventStore.emitEvent(constant.GET_RECORDS, data);
    },
    changeDate(date){
        EventStore.emitEvent(constant.CHANGE_DATE, date);
    },
    setIncomeCount(num){
        incomeCount = num;
        EventStore.emitEvent(constant.INCOME_CHANGE, this.getBalance());
    },
    setExpendCount(num){
        expendCount = num;
        EventStore.emitEvent(constant.EXPEND_CHANGE, this.getBalance());
    },
    getBalance(){
        return incomeCount - expendCount;
    }
};

export default AccountStore;