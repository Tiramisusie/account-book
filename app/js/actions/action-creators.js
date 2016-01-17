/**
 * Created by liangningcong on 16/1/13.
 */
import * as Actions from './action-constants';

/**
 * 新增支出,弹出包含表单的模态框
 * @returns {{type}}
 */
export function addIncome(){
    return {
        type: Actions.ADD_INCOME
    }
}

export function addExpend(){
    return {
        type: Actions.ADD_EXPEND
    }
}

/**
 * 把新增支出记录发送到后台
 * @returns {{type}}
 */
export function postNewIncome(){
    return {
        type: Actions.POST_NEW_INCOME
    }
}

export function postNewExpend(){
    return {
        type: Actions.POST_NEW_EXPEND
    }
}
