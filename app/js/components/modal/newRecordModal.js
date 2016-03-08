/**
 * Created by liangningcong on 16/1/17.
 */
var React = require('react');
var ListItem = require('../listItem/listItem');
import AccountStore from '../../stores/AccountStore'

var Modal = React.createClass({
    getInitialState(){
        return ({
            modalId: this.props.type + '-modal'
        })
    },
    postNewRecord(){
        var recordData = {
                type: this.refs.recordType.value,
                money: this.refs.recordMoney.value
            };

        this.refs.recordType.value = '';
        this.refs.recordMoney.value = '';

        $('#'+ this.props.type + '-modal').modal('hide');

        if(this.props.type === 'income') {
            AccountStore.addIncome(recordData);
        } else {
            AccountStore.addExpend(recordData);
        }
    },
    render(){
        var modalName = this.props.type === 'income' ? '新增收入' : '新增支出';
        return(
            <div className="modal fade" id={this.state.modalId} tabIndex="-1" role="dialog" aria-labelledby="recordModalLabel">
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">{modalName}</h4>
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
                            <button type="button" onClick={this.postNewRecord} className="btn btn-primary">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Modal;