/**
 * Created by liangningcong on 16/2/19.
 */
var constants = require('../constants/accountConstants');
var EventStore = require('./EventStore');
import { Store } from '../utils/utils'

var Api = {
    addIncome(data, date){
        var timeStamp = date.getTime(),
            oldData = Store.get(timeStamp);

        if( !!oldData ) {
            Store.set(timeStamp, oldData.concat(data));
        } else {
            Store.set(timeStamp, [data]);
        }

        EventStore.emitEvent(constants.ADD_INCOME, data);
    }
};

var AccountStore = {
    addIncome(data, date=new Date()){
        Api.addIncome(data, date);
    },
    addExpend(data){
        EventStore.emitEvent(constants.ADD_EXPEND, data);
    }
};

export default AccountStore;