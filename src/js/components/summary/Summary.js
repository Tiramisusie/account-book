import React from 'react'
import {Row, Col, DatePicker} from 'antd'
import Chart from '../chart/chart'
import EventStore from '../../stores/EventStore'
import AccountStore from '../../stores/AccountStore'
import constant from '../../constants/accountConstants'
import {Utils} from '../../utils/utils'
import moment from 'moment'

var Summary = React.createClass({

  getInitialState(){
    return {
      incomeData: [],
      expendData: [],
      lineData: []
    }
  },

  componentDidMount(){
    EventStore.addEventChangeListener(constant.GET_RANGE_RECORDS, this.handleRangeRecords);
    EventStore.addEventChangeListener(constant.GET_RECORDS, this.showOneDayDetail);

    AccountStore.getRangeRecords(moment().subtract(7, 'day')._d, new Date());
  },

  componentWillUnmount(){
    EventStore.removeEventChangeListener(constant.GET_RANGE_RECORDS, this.handleRangeRecords);
    EventStore.removeEventChangeListener(constant.GET_RECORDS, this.showOneDayDetail);
  },

  handleRangeRecords(res){
    let incomeData = res[res.length-1].data.income,
      expendData = res[res.length-1].data.expend;

    this.setState({
      incomeData: incomeData,
      expendData: expendData,
      lineData: res
    })
  },

  //点击左边柱形图后在右边的饼图显示详情
  showOneDayDetail(res){
    this.setState({
      incomeData: res.income,
      expendData: res.expend
    })
  },

  render(){
    let {incomeData, expendData, lineData} = this.state;
    let emptyHolder = <div className="emptyHolder">空的</div>;

    return (
      <Col className="panel-container" span="21">
        <Row>
          <Col span="12">
            <div className="summary-bar-container">
              {
                lineData.length === 0 ?
                  emptyHolder :
                  <Chart data={lineData} type="bar" name="balance" style={{width:"100%",height:"80vh"}} />
              }
            </div>
          </Col>
          <Col span="12">
            <div className="chart-wrapper">
              {
                incomeData.length > 0 ?
                  <Chart data={incomeData} type="pie" name="income" style={{width:"100%",height:"200px"}} /> :
                  emptyHolder
              }
            </div>
            <div className="chart-wrapper">
              {
                expendData.length > 0 ?
                  <Chart data={expendData} type="pie" name="expend" style={{width:"100%",height:"200px"}} /> :
                  emptyHolder
              }
            </div>
          </Col>
        </Row>
      </Col>
    )
  }
});

export default Summary;