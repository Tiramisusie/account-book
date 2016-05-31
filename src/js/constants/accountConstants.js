/**
 * Created by liangningcong on 16/2/17.
 */
var keymirror  = require('keymirror');

var constant = keymirror({
    ADD_INCOME: null,
    ADD_EXPEND: null,
    GET_RECORDS: null,  //获取某一天的记录
    GET_RANGE_RECORDS: null,   //获取一个时间段的记录
    CHANGE_DATE: null,
    INCOME_CHANGE: null,
    EXPEND_CHANGE: null,
    SET_RANGE_BALANCE: null,   //获取一段时间的统计数据
    MODIFY_RECORD: null,
    SAVE_MODIFIED: null,
    DELETE_RECORD: null,
    SELECT_ITEM: null
});

export default constant;