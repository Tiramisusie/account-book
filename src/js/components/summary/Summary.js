import React from 'react'
import {Row, Col, DatePicker} from 'antd'
import Chart from '../chart/chart'
import EventStore from '../../stores/EventStore'
import AccountStore from '../../stores/AccountStore'
import constant from '../../constants/accountConstants'
import moment from 'moment'

var Summary = React.createClass({

  getInitialState(){
    return {
      incomeData: [],
      expendData: [],
      lineData: [],
      rangeIncome: 0,
      rangeExpend: 0
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
    let { totalIncome, totalExpend } = this.getRangeBalance(res);

    if(res.length > 0) {
      let incomeData = res[res.length - 1].data.income,
        expendData = res[res.length - 1].data.expend;

      this.setState({
        incomeData: incomeData,
        expendData: expendData,
        rangeIncome: totalIncome,
        rangeExpend: totalExpend,
        lineData: res
      })
    }
  },

  getRangeBalance(res){
    let totalIncome = 0,
      totalExpend = 0;

    res.map(record=>{
      record.data.income.map(income => {
        totalIncome += (+income.money);
      });
      record.data.expend.map(expend => {
        totalExpend += (+expend.money);
      });
    });

    return {
      totalIncome: totalIncome,
      totalExpend: totalExpend
    }
  },

  //点击左边柱形图后在右边的饼图显示详情
  showOneDayDetail(res){
    this.setState({
      incomeData: res.income,
      expendData: res.expend
    })
  },

  renderEmpty(text){
    return <div className="emptyHolder">{text}</div>;
  },

  render(){
    let {incomeData, expendData, lineData, rangeIncome, rangeExpend} = this.state;

    return (
      <Col className="panel-container" span="21">
        <Row>
          <Col span="12">
            <div className="summary-bar-container">
              {
                lineData.length === 0 ?
                  this.renderEmpty('没有数据') :
                  <Chart data={lineData} type="bar" name="balance" style={{width:"100%",height:"80vh"}} />
              }
            </div>
          </Col>
          <Col span="12">
            <section className="chart-wrapper summary-detail">
              <div>
                <span className="summary-detail-income">总收入:{rangeIncome}</span>
                <span className="summary-detail-expend">总支出:{rangeExpend}</span>
              </div>
              <div>
                <span className="summary-detail-balance">结余:{rangeIncome - rangeExpend}</span>
              </div>
            </section>
            <section className="chart-wrapper">
              {
                incomeData.length > 0 ?
                  <Chart data={incomeData} type="pie" name="income" style={{width:"100%",height:"30vh"}} /> :
                  this.renderEmpty('没有收入')
              }
            </section>
            <section>
              {
                expendData.length > 0 ?
                  <Chart data={expendData} type="pie" name="expend" style={{width:"100%",height:"30vh"}} /> :
                  this.renderEmpty('没有支出')
              }
            </section>
          </Col>
        </Row>
      </Col>
    )
  }
});

export default Summary;