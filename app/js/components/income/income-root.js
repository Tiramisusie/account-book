/**
 * Created by liangningcong on 16/1/4.
 */
import React from 'react';
import ListItem from '../list-item/list-item-root';
import MyChart from '../chart/chart-root';

var Income = React.createClass({
    getInitialState(){
        var listData = this.props.data,
            totalMoney = 0;

        //计算当天的总收入
        for(let i=0, len=listData.length; i<len; i++) {
            totalMoney += listData[i].money;
        }

        return ({
            totalMoney: totalMoney
        })
    },
    _renderListItem(){
        var itemArr = [],
            listData = this.props.data;

        for(var i=0, len=listData.length; i<len; i++) {
            itemArr.push(<ListItem key={i} className='incomeItem' data={listData[i]} />);
        }

        return itemArr;
    },
    _addNewIncome(e){
        e.preventDefault();
        this.props.addIncome();
        $('#recordModal').modal('show');
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
                    <ul className="record-list" id="income-list">
                        {this._renderListItem()}
                    </ul>

                    <div className="btns-list">
                        <a href="#" onClick={this._addNewIncome} className="add-record" title="新增支出">+</a>
                    </div>
                </div>
                <div className="base-panel-chart">
                    <MyChart />
                </div>
            </div>
        )
    }
});

export default Income;
