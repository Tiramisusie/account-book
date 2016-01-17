/**
 * Created by liangningcong on 16/1/13.
 */
import * as Actions from '../actions/action-constants'

export default function reducer(state = 'hello', action){
    switch (action.type) {
        case Actions.ADD_INCOME:
            return {
                modalData: {
                    name: '新增收入'
                }
            };
            break;
        case Actions.ADD_EXPEND:
            return {
                modalData: {
                    name: '新增支出'
                }
            };
        break;
        default:
            return state;
            break;
    }
}