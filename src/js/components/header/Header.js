var React = require('react');
import {DatePicker} from 'antd'
import {Utils} from '../../utils/utils'
import AccountStore from '../../stores/AccountStore'
import EventStore from '../../stores/EventStore'
import constant from '../../constants/accountConstants'

export default class Header extends React.Component{

  constructor(){
    super();

    this.state = {
      balance: 0
    }
  }

  componentDidMount(){
    EventStore.addEventChangeListener(constant.INCOME_CHANGE, this.getBalance);
    EventStore.addEventChangeListener(constant.EXPEND_CHANGE, this.getBalance);
  }

  componentWillUnmount(){
    EventStore.removeEventChangeListener(constant.INCOME_CHANGE, this.getBalance);
    EventStore.removeEventChangeListener(constant.EXPEND_CHANGE, this.getBalance);
  }

  changeDate(date){
    AccountStore.changeDate(date);
  }

  getBalance=(balance)=>{
    this.setState({
      balance: balance
    })
  };

  render(){
    let today = Utils.getTimeStamp(new Date());
    let balance = this.state.balance;

    return (
      <div id="header">
        <h1 className="app-title">网络记账系统</h1>

        <div className="balance">
          <span>结余:</span>
          <span>{balance}</span>
        </div>

        <div className="date-picker">
          <DatePicker defaultValue={today} format="yyyy-MM-dd" size="large" onChange={this.changeDate} />
        </div>
      </div>
    )
  }
}