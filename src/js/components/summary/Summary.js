import React from 'react'
import {Row, Col, DatePicker} from 'antd'
import Chart from '../chart/chart'
import EventStore from '../../stores/EventStore'
import AccountStore from '../../stores/AccountStore'
import constant from '../../constants/accountConstants'
import {Utils} from '../../utils/utils'

var Summary = React.createClass({

  getInitialState(){
    return {
      incomeData: [],
      expendData: [],
      lineData: []
    }
  },

  componentDidMount(){
    let today = new Date();

    EventStore.addEventChangeListener(constant.GET_RANGE_RECORDS, this.handleRangeRecords);
    AccountStore.getRangeRecords(today, today);
  },

  componentWillUnmount(){
    EventStore.removeEventChangeListener(constant.GET_RANGE_RECORDS, this.handleRangeRecords);
  },

  handleRangeRecords(res){
    let incomeData = [],
      expendData = [],
      lineData = [1];

    res.map(obj => {
      incomeData = incomeData.concat(obj.data.income);
      expendData = expendData.concat(obj.data.expend);
    });

    this.setState({
      incomeData: incomeData,
      expendData: expendData,
      lineData: lineData
    })
  },

  render(){
    let {incomeData, expendData, lineData} = this.state;
    let today = Utils.getTimeStamp(new Date());
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
                  <Chart data={incomeData} type="pie" name="income-sum" style={{width:"100%",height:"200px"}} /> :
                  emptyHolder
              }
            </div>
            <div className="chart-wrapper">
              {
                expendData.length > 0 ?
                  <Chart data={expendData} type="pie" name="expend-sum" style={{width:"100%",height:"200px"}} /> :
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