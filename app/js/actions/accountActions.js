var constants = require('../constants/accountConstants');
var AppDispatcher = require('../dispatcher/appDispatcher');

var accountActions = {
    addExpend(data){
        AppDispatcher.dispatch({
            actionType: constants.ADD_EXPEND,
            data: data
        })
    },
    addIncome(data){
        AppDispatcher.dispatch({
            actionType: constants.ADD_INCOME,
            data: data
        })
    }
};

module.exports = accountActions;
