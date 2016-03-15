/**
 * Created by liangningcong on 16/1/4.
 */
var React = require('react');
var ListItem = require('../listItem/listItem');
var MyChart = require('../chart/chart');
var EventStore = require('../../stores/EventStore');
import constant from '../../constants/accountConstants'
var AccountStore = require('../../stores/AccountStore');
var Modal = require('../modal/newRecordModal');
import { Col } from 'antd'

var Income = React.createClass({
    getInitialState(){
        var data = this.propsToState(this.props.data);
        return ({
            listData: data.listData,
            totalMoney: data.totalMoney,
            chartData: this.props.data,
            type: this.props.type,
            data: this.props.data,
            [`${this.props.type}Visible`]: false
        })
    },

    componentDidMount(){
        if(this.props.type === 'income') {
            EventStore.addEventChangeListener(constant.ADD_INCOME, this.addNewItem);
        } else {
            EventStore.addEventChangeListener(constant.ADD_EXPEND, this.addNewItem);
        }
    },

    componentWillReceiveProps(nextProps){
        let newState = this.propsToState(nextProps.data);
        this.setState({
            listData: newState.listData,
            totalMoney: newState.totalMoney,
            chartData: nextProps.data,
            data: nextProps.data
        })
    },

    componentWillUnmount(){
        if(this.props.type === 'income') {
            EventStore.removeEventChangeListener(constant.ADD_INCOME, this.addNewItem);
        } else {
            EventStore.removeEventChangeListener(constant.ADD_EXPEND, this.addNewItem);
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
            totalMoney: totalMoney
        };
    },

    addNewItem(data){
        var newProps = this.state.data.concat(data),
            newState = this.propsToState(newProps);
        this.setState({
            listData: newState.listData,
            totalMoney: newState.totalMoney,
            chartData: newProps,
            data: newProps,
            [`${this.props.type}Visible`]: false
        })
    },

    handleClick(e){
        e.preventDefault();
        this.setState({
            [`${this.props.type}Visible`]: true
        })
    },

    render(){
        var {listData, totalMoney, chartData, type} = this.state,
            style = {marginLeft: '100px'};

        return (
            <Col id={type} span="9" style={ type==='expend' ? style : null }>
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
                <Modal type={type} visible={this.state[`${type}Visible`]}/>
            </Col>
        )
    }
});

module.exports = Income;
