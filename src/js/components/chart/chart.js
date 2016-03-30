import React from 'react'
import { findDOMNode } from 'react-dom'
import EventStore from '../../stores/EventStore'
import AccountStore from '../../stores/AccountStore'
import constant from '../../constants/accountConstants'

var chartNameMap = {
  income: '收入',
  expend: '支出'
};

export default class EChart extends React.Component{

  myChart = null;  // the chart obj

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
        break;
      case 'bar':
        options = this.setBarChart(data);
        this.myChart.on('click', (event)=>{
          AccountStore.getRecords(new Date(event.name));
        });
        break;
    }

    this.myChart.setOption(options);
  };

  setPieChart(data, title){
    return {
      title: {
        text: chartNameMap[title],
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
    let options = {
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['结余', '支出', '收入']
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
          data : []
        }
      ],
      series : [
        {
          name:'结余',
          type:'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data:[]
        },
        {
          name:'收入',
          type:'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data:[]
        },
        {
          name:'支出',
          type:'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data:[]
        }
      ]
    };

    data.map(obj => {
      let incomeTotal = 0,
        expendTotal = 0;

      options.yAxis[0].data.push(obj.date);
      obj.data.income.map(income => {
        incomeTotal += (+income.money);
      });
      obj.data.expend.map(expend => {
        expendTotal += (+expend.money);
      });

      options.series[0].data.push(incomeTotal - expendTotal);   //结余
      options.series[1].data.push(incomeTotal);                 //收入
      options.series[2].data.push(-expendTotal);                //支出
    });

    return options;
  }

  updateChart(newData){
    let options = this.setBarChart(newData);

    this.myChart.setOption(options);
  }

  componentDidMount(){
    this.initChart(this.props);
  }

  componentWillReceiveProps(nextProps){
    let options,
      { type, data, name } = nextProps;

    if(type === 'bar') {
      options = this.setBarChart(data);
    } else {
      options = this.setPieChart(data, name);
    }

    this.myChart.setOption(options);
  }

  render(){
    let { name, style } = this.props;
    
    return <div id={name} ref={name} style={style}></div>
  }
}