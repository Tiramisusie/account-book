/**
 * Created by liangningcong on 16/2/19.
 */
var AppDispatcher = require('../dispatcher/appDispatcher');
var constants = require('../constants/accountConstants');
var EventStore = require('./EventStore');

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case constants.ADD_EXPEND:
            ActionStore.addExpend(action.data);
            break;
        case constants.ADD_INCOME:
            ActionStore.addIncome(action.data);
            break;
    }
});

var ActionStore = {
    addIncome(data){
        EventStore.emitEvent(constants.ADD_INCOME, data);
    },
    addExpend(data){
        EventStore.emitEvent(constants.ADD_EXPEND, data);
    }
};

module.exports = ActionStore;