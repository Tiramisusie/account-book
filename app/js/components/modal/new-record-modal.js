/**
 * Created by liangningcong on 16/1/17.
 */
import React from 'react';
import ListItem from '../list-item/list-item-root';

var Modal = React.createClass({
    _postNewRecord(){
        var recordData = {
                type: this.refs.recordType.value,
                money: this.refs.recordMoney.value
            };

        this.refs.recordType.value = '';
        this.refs.recordMoney.value = '';

        $('#recordModal').modal('hide');

        if(this.props.data.type === 'income') {
            this.props.postNewIncome(recordData);
        } else {
            this.props.postNewExpend(recordData);
        }
    },
    getDefaultProps(){
        return {
            data: {
                type: 'income',
                name: '新增支出'
            }
        };
    },
    render(){
        return(
            <div className="modal fade" id="recordModal" tabIndex="-1" role="dialog" aria-labelledby="recordModalLabel">
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">{this.props.data.name}</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recordType">类型</label>
                                    <input type="text" className="form-control" ref="recordType" id="recordType" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recordMoney">金额</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">￥</div>
                                        <input type="number" className="form-control" ref="recordMoney" id="recordMoney" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" onClick={this._postNewRecord} className="btn btn-primary">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Modal;