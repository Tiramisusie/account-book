/**
 * Created by liangningcong on 16/1/17.
 */
var React = require('react');
import { Modal, Form, Input } from 'antd'
const FormItem = Form.Item;

var AddRecordModal = React.createClass({
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
        let type = this.refs.recordType,
          money = this.refs.recordMoney;

        var recordData = {
            type: type.value,
            money: money.value
        };

        type.value = '';
        money.value = '';

        this.props.handleAddRecord(recordData);
    },

    render(){
        var modalName = this.props.type === 'income' ? '新增收入' : '新增支出',
            formItemLayout = {
                labelCol: {span: 6},
                wrapperCol: {span: 14}
            };

        return (
            <Modal id={this.state.modalId} 
                   title={modalName} 
                   visible={this.state.visible}
                   onOk={this.handleOK} 
                   onCancel={this.handleCancel} width="400"
            >
                <Form horizontal>
                    <FormItem label="类型: " {...formItemLayout}>
                        <input type="text" 
                               id="recordType" 
                               ref="recordType"
                               className="ant-input ant-input-lg" 
                               style={{marginLeft:'10px'}}
                        />
                    </FormItem>
                    <FormItem label="金额: " {...formItemLayout}>
                        <input type="number" 
                               id="recordMoney" 
                               ref="recordMoney"
                               className="ant-input ant-input-lg" 
                               style={{marginLeft:'10px'}}
                        />
                    </FormItem>
                </Form>
            </Modal>
        )
    }
});

module.exports = AddRecordModal;