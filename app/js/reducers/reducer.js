/**
 * Created by liangningcong on 16/1/13.
 */
import * as Actions from '../actions/action-constants'

export default function reducer(state={}, action){
    switch (action.type) {
        case Actions.ADD_INCOME:
            return {
                modalData: {
                    type: 'income',
                    name: '新增收入'
                }
            };
            break;
        case Actions.ADD_EXPEND:
            return {
                modalData: {
                    type: 'expend',
                    name: '新增支出'
                }
            };
            break;
        case Actions.POST_NEW_INCOME:
            return {
                newIncomeData: action.data
            };
            break;
        case Actions.POST_NEW_EXPEND:
            return {
                newExpendData: action.data
            };
            break;
        default:
            return state;
            break;
    }
}