var constants = require('../constants/accountConstants');
var AppDispatcher = require('../dispatcher/appDispatcher');

var accountActions = {
    addIncome(){
        AppDispatcher.dispatch({
            actionType: constants.ADD_INCOME
        })
    },
    addExpend(){
        AppDispatcher.dispatch({
            actionType: constants.ADD_EXPEND
        })
    }
};

module.exports = accountActions;
