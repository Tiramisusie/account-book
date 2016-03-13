/**
 * Created by liangningcong on 16/1/4.
 */
var React = require('react');
var ListItem = require('../listItem/listItem');
var MyChart = require('../chart/chart');
var EventStore = require('../../stores/EventStore');
var Constants = require('../../constants/accountConstants');
var AccountStore = require('../../stores/AccountStore');
var Modal = require('../modal/newRecordModal');
import { Col } from 'antd'

var Income = React.createClass({
    getInitialState(){
        var data = this.propsToState(this.props.data);
        return ({
            listData: data.listData,
            totalMoney: data.totalMoney,
            chartData: data.chartData,
            type: this.props.type,
            data: this.props.data
        })
    },

    componentDidMount(){
        if(this.props.type === 'income') {
            EventStore.addEventChangeListener(Constants.ADD_INCOME, this.addNewItem);
        } else {
            EventStore.addEventChangeListener(Constants.ADD_EXPEND, this.addNewItem);
        }
    },

    componentWillUnmount(){
        if(this.props.type === 'income') {
            EventStore.removeEventChangeListener(Constants.ADD_INCOME, this.addNewItem);
        } else {
            EventStore.removeEventChangeListener(Constants.ADD_EXPEND, this.addNewItem);
        }
    },

    propsToState(listdata){
        var itemArr = [],
            totalMoney = 0,
            listData = listdata;

        for(var i = 0, len = listData.length; i < len; i++) {
            //生成列表项
            itemArr.push(<ListItem key={i} className='incomeItem' data={listData[i]}/>);
            //计算总金额
            totalMoney += listData[i].money * 1;
        }

        return {
            listData: itemArr,
            totalMoney: totalMoney,
            chartData: listData
        };
    },

    addNewItem(data){
        var newProps = this.state.data.concat(data),
            newState = this.propsToState(newProps);
        this.setState({
            listData: newState.listData,
            totalMoney: newState.totalMoney,
            chartData: newProps,
            data: newProps
        })
    },

    handleClick(e){
        e.preventDefault();
        $('#'+ this.state.type +'-modal').modal('show');
    },

    render(){
        var {listData, totalMoney, chartData, type} = this.state;

        return (
            <Col id={type} span="7">
                <div className="base-panel-head">
                    <h3 className="total-title">
                        {type === 'income' ? '总收入' : '总支出'}
                        <span className="total-money">
                            <span className="total-currency">CNY</span>
                            <span className="total-num">{totalMoney}</span>
                        </span>
                        <span className="add-record" onClick={this.handleClick}>
                            {'+'}
                        </span>
                    </h3>
                </div>
                <div className="base-panel-list">
                    <ul className="record-list" id="income-list">
                        {listData}
                    </ul>
                </div>
                <div className="base-panel-chart">
                    <MyChart data={chartData} type={type}/>
                </div>
                <Modal type={type}/>
            </Col>
        )
    }
});

module.exports = Income;
