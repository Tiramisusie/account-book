import React from 'react'
import { findDOMNode } from 'react-dom'
import EventStore from '../../stores/EventStore'
import constant from '../../constants/accountConstants'

export default class EChart extends React.Component{

  myChart = null;  // the chart obj
  options = {};

  static propTypes = {
    data: React.PropTypes.array,  //chart data
    name: React.PropTypes.string, //name of the chart container
    type: React.PropTypes.string  //the type of chart
  };

  /**
   * 初始化chart 
   * @param type chart的类型 
   * @param data chart的源数据
   * @param name chart的title
   */
  initChart = ({type, data, name})=>{
    let options;
    
    this.myChart = echarts.init(findDOMNode(this.refs[name]));

    switch (type) {
      case 'pie':
        options = this.setPieChart(data, name);
        this.options = options;
        break;
      case 'bar':
        options = this.setBarChart(data);
        this.options = options;
        break;
    }

    this.myChart.setOption(options);
  };

  setPieChart(data, title){
    return {
      title: {
        text: title,
        left: 'left',
        top: 'top',
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}'
      },
      series: [{
        type: 'pie',
        name: title,
        radius: '50%',
        data: data.map((obj)=>{
          return {
            name: obj.type,
            value: obj.money
          }
        })
      }]
    };
  }

  setBarChart(data){
    return {
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['利润', '支出', '收入']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'value'
        }
      ],
      yAxis : [
        {
          type : 'category',
          axisTick : {show: false},
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      series : [
        {
          name:'利润',
          type:'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data:[200, 170, 240, 244, 200, 220, 210]
        },
        {
          name:'收入',
          type:'bar',
          stack: '总量',
          label: {
            normal: {
              show: true
            }
          },
          data:[320, 302, 341, 374, 390, 450, 420]
        },
        {
          name:'支出',
          type:'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'left'
            }
          },
          data:[-120, -132, -101, -134, -190, -230, -210]
        }
      ]
    };

  }

  updateChart(newData){
    this.options.series[0].data = newData.map((obj)=>{
      return {
        name: obj.type,
        value: obj.money
      }
    });

    this.myChart.setOption(this.options);
  }

  componentDidMount(){
    this.initChart(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.updateChart(nextProps.data);
  }

  render(){
    let { name, style } = this.props;
    
    return <div id={name} ref={name} style={style}></div>
  }
}