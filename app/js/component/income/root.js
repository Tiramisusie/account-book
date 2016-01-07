/**
 * Created by liangningcong on 16/1/4.
 */
import React from 'react';
import ListItem from '../list-item/root';

var Income = React.createClass({
    getInitialState(){
        var listData = this.props.data.income,
            totalMoney = 0;

        //计算当天的总收入
        for(let i=0, len=listData.length; i<len; i++) {
            totalMoney += listData[i].money;
        }

        return ({
            totalMoney: totalMoney
        })
    },
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
    _renderListItem(){
        var itemArr = [],
            listData = this.props.data.income;

        for(var i=0, len=listData.length; i<len; i++) {
            itemArr.push(<ListItem key={i} className='incomeItem' data={listData[i]} />);
        }

        return itemArr;
    },
    render(){
        return (
            <div id="income" className="base-panel">
                <div className="base-panel-head">
                    <h3 className="total-title">
                        总收入
                        <span className="total-money">
                            <span className="total-currency">CNY</span>
                            <span className="total-num">{this.state.totalMoney}</span>
                        </span>
                    </h3>
                </div>
                <div className="base-panel-list">
                    <ul className="record-list">
                        {this._renderListItem()}
                    </ul>
                </div>
                <div className="base-panel-chart">
                    <canvas ref="incomeChart" id="incomeChart" className="chartContainer"></canvas>
                </div>
            </div>
        )
    }
});

export default Income;
