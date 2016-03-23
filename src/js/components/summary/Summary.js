import React from 'react'
import {Col, DatePicker} from 'antd'
import Chart from '../chart/chart'
import EventStore from '../../stores/EventStore'
import AccountStore from '../../stores/AccountStore'
import constant from '../../constants/accountConstants'
import { Utils } from '../../utils/utils'

var Summary = React.createClass({

  getInitialState(){
    return {
      incomePieData: [],
      expendPieData: [],
      lineData: []
    }
  },

  componentDidMount(){
    EventStore.addEventChangeListener(constant.GET_RECORDS, this.getData);
    EventStore.addEventChangeListener(constant.GET_RANGE_RECORDS, this.handleRangeRecords);
    AccountStore.getRecords();
  },

  componentWillUnmount(){
    EventStore.removeEventChangeListener(constant.GET_RECORDS, this.getData);
    EventStore.removeEventChangeListener(constant.GET_RANGE_RECORDS, this.handleRangeRecords);
  },

  handleRangeRecords(res){
    this.setState({
      lineData: res
    })
  },

  getData(data){
    let state = data ? data : {income: [], expend: []};

    this.setState({
      incomeData: state.income,
      expendData: state.expend
    });
  },

  onSelectDate(date){
    let start = date[0],
      end = date[1];

    AccountStore.getRangeRecords(start, end);
  },

  render(){
    let {incomeData, expendData, lineData} = this.state;
    let today = Utils.getTimeStamp(new Date());

    return (
      <Col className="panel-container" span="21">
        <div id="date-range" className="range-picker">
          <DatePicker.RangePicker onChange={this.onSelectDate} defaultValue={[today, today]}/>
        </div>

        <div className="chart-wrapper">
          <div className="sum-chart-container">
            <Chart data={incomeData} type="doughnut" name="income-sum"/>
          </div>
          <div className="sum-chart-container">
            <Chart data={expendData} type="doughnut" name="expend-sum"/>
          </div>
        </div>

        <div className="chart-wrapper">
          <Chart data={lineData} type="line" name="sum-line" />
        </div>
      </Col>
    )
  }
});

export default Summary;