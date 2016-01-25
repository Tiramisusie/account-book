/**
 * Created by liangningcong on 16/1/10.
 */
import React from 'react';
import {randomColor} from 'randomcolor'

var MyChart = React.createClass({
    /**
     * 把列表数据映射成适用于图表的数据格式
     * @param oriData 列表数据
     * @returns {Array} 适用于图表的数据格式
     * @private
     */
    _mapPropsToChartData(oriData){
        var chartData = [];

        oriData.map(function(cur){
            chartData.push({
                value: cur.money * 1,
                color: randomColor(),
                label: cur.type
            })
        });

        return chartData;
    },
    /**
     * 获取最新的图表数据,并更新图表
     * @param oriData
     * @private
     */
    _renderChart(oriData){
        var data = this._mapPropsToChartData(oriData),
            ctx = this.refs.myChart.getContext('2d');

        if(this.props.type === 'income') {
            if( incomeChart ) {
                //销毁旧的图表
                incomeChart.destroy();
            }
            incomeChart = new Chart(ctx).Pie(data);
        } else {
            if( expendChart ) {
                //销毁旧的图表
                expendChart.destroy();
            }
            expendChart = new Chart(ctx).Pie(data);
        }


    },
    componentDidMount(){
        this._renderChart(this.props.data);
    },
    componentWillReceiveProps(nextProps){
        if(this.props.data != nextProps.data) {
            this._renderChart(nextProps.data);
        }
    },
    render(){
        return (
            <canvas ref="myChart" id="myChart" className="chartContainer"></canvas>
        )
    }
});

export default MyChart;