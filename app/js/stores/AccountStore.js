/**
 * Created by liangningcong on 16/2/19.
 */
var constants = require('../constants/accountConstants');
var EventStore = require('./EventStore');
import { Store } from '../utils/utils'

var Api = {
    
};

var AccountStore = {
    /**
     * @param date 日期
     * @param data 数据
     */
    addIncome(date, data){
        EventStore.emitEvent(constants.ADD_INCOME, data);
    },
    addExpend(data){
        EventStore.emitEvent(constants.ADD_EXPEND, data);
    }
};

export default AccountStore;