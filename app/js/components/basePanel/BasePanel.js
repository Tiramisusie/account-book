/**
 * Created by liangningcong on 16/1/4.
 */
var React = require('react');
var ListItem = require('../listItem/listItem');
var MyChart = require('../chart/chart');
var Actions = require('../../actions/accountActions');
var EventStore = require('../../stores/EventStore');
var Constants = require('../../constants/accountConstants');
var AccountStore = require('../../stores/AccountStore');
var Modal = require('../modal/newRecordModal');

var Income = React.createClass({
    getInitialState(){
        var data = this.propsToState(this.props.data);
        return ({
            listData: data.listData,
            totalMoney: data.totalMoney,
            chartData: data.chartData,
            type: this.props.type
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
        var newProps = this.props.data.concat(data),
            newState = this.propsToState(newProps);
        this.setState({
            listData: newState.listData,
            totalMoney: newState.totalMoney,
            chartData: newProps
        })
    },
    handleClick(e){
        e.preventDefault();
        $('#'+ this.state.type +'-modal').modal('show');
    },
    render(){
        return (
            <div id={this.state.type} className="base-panel">
                <div className="base-panel-head">
                    <h3 className="total-title">
                        {this.state.type === 'income' ? '总收入' : '总支出'}
                        <span className="total-money">
                            <span className="total-currency">CNY</span>
                            <span className="total-num">{this.state.totalMoney}</span>
                        </span>
                    </h3>
                </div>
                <div className="base-panel-list">
                    <ul className="record-list" id="income-list">
                        {this.state.listData}
                    </ul>
                </div>
                <div className="btns-list">
                    <a href="#" onClick={this.handleClick} className="add-record" title="新增收入">+</a>
                </div>
                <div className="base-panel-chart">
                    <MyChart data={this.state.chartData} type={this.state.type}/>
                </div>
                <Modal type={this.state.type}/>
            </div>
        )
    }
});

module.exports = Income;
