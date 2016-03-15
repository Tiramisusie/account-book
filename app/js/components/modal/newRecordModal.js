/**
 * Created by liangningcong on 16/1/17.
 */
var React = require('react');
var ListItem = require('../listItem/listItem');
import AccountStore from '../../stores/AccountStore'
import { Modal } from 'antd'

var MyModal = React.createClass({
    getInitialState(){
        return ({
            visible: this.props.visible,
            modalId: this.props.type + '-modal'
        })
    },

    componentWillReceiveProps(nextProps){
        this.setState({
            visible: nextProps.visible
        })
    },

    handleCancel(){
        this.setState({
            visible: false
        })
    },

    handleOK(){
        var recordData = {
            type: this.refs.recordType.value,
            money: this.refs.recordMoney.value
        };

        this.refs.recordType.value = '';
        this.refs.recordMoney.value = '';

        if(this.props.type === 'income') {
            AccountStore.addIncome(recordData);
        } else {
            AccountStore.addExpend(recordData);
        }
    },

    render(){
        var modalName = this.props.type === 'income' ? '新增收入' : '新增支出';
        return(
            <Modal id={this.state.modalId} title={modalName} visible={this.state.visible}
                onOk={this.handleOK} onCancel={this.handleCancel}
            >
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
            </Modal>
        )
    }
});

module.exports = MyModal;