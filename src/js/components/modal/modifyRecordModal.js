/**
 * Created by liangningcong on 16/4/7.
 */
import React from 'react'
import { Modal, Form, Input } from 'antd'
const FormItem = Form.Item;

export default class ModifyRecordModal extends React.Component{
  static propTypes = {
    type: React.PropTypes.string,
    data: React.PropTypes.object,
    visible: React.PropTypes.bool
  };

  state = {
    visible: this.props.visible,
    content: this.props.modifyContent
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      visible: nextProps.visible,
      content: nextProps.modifyContent
    })
  }

  handleCancel = ()=>{
    this.setState({
      visible: false
    })
  };

  handleOK = ()=>{
    let recordMoney = this.refs.recordMoney,
      recordType = this.refs.recordType,
      content = this.state.content;

    let newRecord = {
      type: recordType.value ? recordType.value : content.type,
      money: recordMoney.value ? recordMoney.value : content.money
    };

    recordMoney.value = '';
    recordType.value = '';

    this.props.handleSave(newRecord);
  };
  
  render(){
    var modalName = this.props.type === 'income' ? '修改收入' : '修改支出',
      formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14}
      };
    let { visible, content } = this.state;

    return (
      <Modal title={modalName}
             visible={visible}
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
                   placeholder={content.type}
            />
          </FormItem>
          <FormItem label="金额: " {...formItemLayout}>
            <input type="number"
                   id="recordMoney"
                   ref="recordMoney"
                   className="ant-input ant-input-lg"
                   style={{marginLeft:'10px'}}
                   placeholder={content.money}
            />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}