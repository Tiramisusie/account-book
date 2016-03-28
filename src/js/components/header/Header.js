var React = require('react');
import { findDOMNode } from 'react-dom'
import {Utils} from '../../utils/utils'
import AccountStore from '../../stores/AccountStore'
import EventStore from '../../stores/EventStore'
import constant from '../../constants/accountConstants'
import {DatePicker} from 'antd'
const RangePicker = DatePicker.RangePicker;
import moment from 'moment'

export default class Header extends React.Component{

  constructor(){
    super();

    this.state = {
      balance: 0,
      routePath: '/daily'
    }
  }

  componentDidMount(){
    EventStore.addEventChangeListener(constant.INCOME_CHANGE, this.getBalance);
    EventStore.addEventChangeListener(constant.EXPEND_CHANGE, this.getBalance);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      routePath: nextProps.routePath
    })
  }

  componentWillUnmount(){
    EventStore.removeEventChangeListener(constant.INCOME_CHANGE, this.getBalance);
    EventStore.removeEventChangeListener(constant.EXPEND_CHANGE, this.getBalance);
  }

  onChangeDate(date){
    AccountStore.changeDate(date);
  }

  onChangeRangeDate(date){
    let start = date[0],
      end = date[1];

    AccountStore.getRangeRecords(start, end);
  }

  getBalance=(balance)=>{
    this.setState({
      balance: balance
    })
  };

  render(){
    let today = Utils.getTimeStamp(new Date());
    let aWeekAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
    let { balance, routePath } = this.state;

    return (
      <div id="header">
        <h1 className="app-title">网络记账系统</h1>

        <div className="balance">
          <span>结余:</span>
          <span>{balance}</span>
        </div>

        <div className="date-picker">
          {
            routePath === '/daily' ?
              <DatePicker defaultValue={today} format="yyyy-MM-dd" size="large" onChange={this.onChangeDate} /> :
              <RangePicker onChange={this.onChangeRangeDate} ref="rangePicker" size="large" defaultValue={[aWeekAgo, today]}/>
          }
        </div>
      </div>
    )
  }
}