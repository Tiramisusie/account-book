/**
 * Created by liangningcong on 16/1/10.
 */
var React = require('react');
import Please from '../../libs/Please'

var MyChart = React.createClass({

  myChart: null,  //保存 chart 对象索引

  propTypes: {
    name: React.PropTypes.string,
    data: React.PropTypes.array,        //数据
    type: React.PropTypes.string   //图表类型: 饼图/折线图...
  },

  componentDidMount(){
    this.renderChart(this.props.data);
  },

  componentWillReceiveProps(nextProps){
    if (this.props.data != nextProps.data) {
      this.renderChart(nextProps.data);
    }
  },

  //返回不同类型的 chart 的构造函数
  chartFactory(type, oriData, ctx){
    let chartData,
      chartObj;

    switch (type) {
      case 'pie':
      case 'doughnut':
        chartData = this.formatPieChartData(oriData);
        chartObj = new Chart(ctx).Doughnut(chartData, {
          animationSteps: 60,
          animationEasing: 'easeOutCirc'
        });
        break;
      case 'line':
        chartData = this.formatLineChartData(oriData);
        chartObj = new Chart(ctx).Line(chartData);
        break;
    }

    return chartObj;
  },

  formatPieChartData(oriData){
    var chartData = [];

    if(oriData){
      oriData.map(function(cur) {
        chartData.push({
          value: cur.money * 1,
          color: Please.make_color(),
          label: cur.type
        })
      });
    }

    return chartData;
  },

  formatLineChartData(oriData){
    log(oriData);
    let labels = [],
      income = {
        label: '收入',
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: []
      },
      expend = {
        label: "支出",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: []
      };

    if (oriData) {
      oriData.map((obj)=> {
        labels.push(obj.date);
        income.data.push(obj.data.income);
        expend.data.push(obj.data.expend);
      });
    }

    return {
      labels: labels,
      datasets: [income, expend]
    }
  },

  renderChart(oriData){
    const {type, name} = this.props;
    let ctx = this.refs[name].getContext('2d');

    if (this.myChart) {
      //销毁旧的图表
      this.myChart.destroy();
    }
    this.myChart = this.chartFactory(type, oriData, ctx);
  },

  render(){
    return <canvas ref={this.props.name}/>
  }
});

module.exports = MyChart;