/**
 * Created by liangningcong on 16/1/17.
 */
var React = require('react');
var ListItem = require('../listItem/listItem');
import AccountStore from '../../stores/AccountStore'
import { Modal, Form, Input } from 'antd'
const FormItem = Form.Item;

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
        var modalName = this.props.type === 'income' ? '新增收入' : '新增支出',
            formItemLayout = {
                labelCol: {span: 6},
                wrapperCol: {span: 14}
            };

        return (
            <Modal id={this.state.modalId} title={modalName} visible={this.state.visible}
                   onOk={this.handleOK} onCancel={this.handleCancel} width="500"
            >
                <Form horizontal>
                    <FormItem label="类型" {...formItemLayout}>
                        <Input type="text" ref="recordType" id="recordType"/>
                    </FormItem>
                    <FormItem label="金额" {...formItemLayout}>
                        <Input type="number" ref="recordMoney" id="recordMoney"/>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
});

module.exports = MyModal;