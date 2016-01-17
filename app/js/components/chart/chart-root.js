/**
 * Created by liangningcong on 16/1/10.
 */
import React from 'react';

var MyChart = React.createClass({
    componentDidMount(){
        var data = [
            {
                value: 30,
                color:"#F38630"
            },
            {
                value : 50,
                color : "#E0E4CC"
            },
            {
                value : 100,
                color : "#69D2E7"
            }
        ];

        var ctx = this.refs.incomeChart.getContext('2d'),
            chart = new Chart(ctx).Pie(data);
    },
    render(){
        return (
            <canvas ref="incomeChart" id="incomeChart" className="chartContainer"></canvas>
        )
    }
});

export default MyChart;