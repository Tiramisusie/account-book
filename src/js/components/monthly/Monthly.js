/**
 * Created by liangningcong on 16/5/31.
 */
import React from 'react'
import { Row, Col } from 'antd';
import { findDOMNode } from 'react-dom'
import { Utils } from '../../utils/utils'
import constant from '../../constants/accountConstants'
import EventStore from '../../stores/EventStore'
import AccountStore from '../../stores/AccountStore'
import moment from 'moment'

export default class Monthly extends React.Component{

  monthlyChart = null;

  renderChart(incomeData, expendData, incomePie, expendPie){
    this.monthlyChart = echarts.init(findDOMNode(this.refs.monthly));
    let daysInMonth = Utils.getDaysInMonth();

    let option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: false,
          playInterval: 10,
          data: daysInMonth
        },
        tooltip: {},
        legend: {
          data: ['收入', '支出']
        },
        calculable : true,
        grid: {
          top: 80,
          bottom: 100
        },
        xAxis: [
          {
            'type':'category',
            'axisLabel':{'interval':0},
            'data':daysInMonth,
            splitLine: {show: false}
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '金额（元）'
          }
        ],
        series: [
          {name: '收入', type: 'bar'},
          {name: '支出', type: 'bar'},
          {
            name: '收入项目',
            type: 'pie',
            center: ['88%', '18%'],
            radius: '20%'
          },
          {
            name: '支出项目',
            type: 'pie',
            center: ['88%', '48%'],
            radius: '20%'
          }
        ]
      },
      options: daysInMonth.map( (day)=>{
        return {
          series:[
            {data: incomeData},
            {data: expendData},
            {data: incomePie[day]},
            {data: expendPie[day]}
          ]
        }
      })
    };

    this.monthlyChart.setOption(option);
  }

  componentDidMount(){
    let month = moment().format('YYYY-M'),
      start = month + '-1',
      end = month + '-' + Utils.getDaysInMonth().splice(-1)[0];

    EventStore.addEventChangeListener(constant.GET_MONTHLY_RECORDS, this.dataFormatter);
    AccountStore.getMonthlyRecords(start, end);
  }

  dataFormatter = (res)=>{
    let incomeData = [],
      expendData = [],
      incomePie = {},
      expendPie = {},
      days = Utils.getDaysInMonth();

    days.map( (day)=>{
      incomeData[day-1] = 0;
      expendData[day-1] = 0;
      incomePie[day] = [];
      expendPie[day] = [];
    });

    res.forEach( (record)=>{
      let day = (new Date(record.date)).getDate();

      if(record.income) {
        record.income.forEach((item)=> {
          incomeData[day-1] += +item.money;
          incomePie[day].push({
            name: item.type,
            value: item.money
          })
        });
      }

      if(record.expend) {
        record.expend.forEach((item)=> {
          expendData[day-1] += +item.money;
          expendPie[day].push({
            name: item.type,
            value: item.money
          })
        })
      }
    });
    this.renderChart(incomeData, expendData, incomePie, expendPie);
  };

  componentWillUnmount() {
    EventStore.removeEventChangeListener(constant.GET_MONTHLY_RECORDS, this.dataFormatter);
  }

  render() {
    return (
      <Col span="21" className="panel-container">
        <Row>
          <section className="monthly-container">
            <div className="monthly-chart" ref="monthly"></div>
          </section>
        </Row>
      </Col>
    )
  }
}