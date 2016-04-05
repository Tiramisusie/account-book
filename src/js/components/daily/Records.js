/**
 * Created by liangningcong on 16/1/4.
 */
var React = require('react');
var ListItem = require('../listItem/listItem');
var EventStore = require('../../stores/EventStore');
import AccountStore from '../../stores/AccountStore';
import constant from '../../constants/accountConstants';
var Modal = require('../modal/newRecordModal');
import { Row, Col, Button } from 'antd';
import EChart from '../chart/chart';

const Income = React.createClass({
  getInitialState(){
    let data = this.propsToState(this.props.data);
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
    if (this.props.type === 'income') {
      AccountStore.setIncomeCount(this.state.totalMoney);
      EventStore.addEventChangeListener(constant.ADD_INCOME, this.addNewItem);
    } else {
      EventStore.addEventChangeListener(constant.ADD_EXPEND, this.addNewItem);
      AccountStore.setExpendCount(this.state.totalMoney);
    }
  },

  componentWillReceiveProps(nextProps){
    let newState = this.propsToState(nextProps.data);

    this.setState({
      listData: newState.listData,
      totalMoney: newState.totalMoney,
      chartData: nextProps.data,
      data: nextProps.data
    });

    if (this.props.type === 'income') {
      AccountStore.setIncomeCount(newState.totalMoney);
    } else {
      AccountStore.setExpendCount(newState.totalMoney);
    }
  },

  componentWillUnmount(){
    if (this.props.type === 'income') {
      EventStore.removeEventChangeListener(constant.ADD_INCOME, this.addNewItem);
    } else {
      EventStore.removeEventChangeListener(constant.ADD_EXPEND, this.addNewItem);
    }
  },

  propsToState(listdata){
    var itemArr = [],
      totalMoney = 0,
      listData = listdata;

    for (var i = 0, len = listData.length; i < len; i++) {
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
    var {listData, chartData, type, totalMoney} = this.state,
      style = {marginLeft: '100px'};
    let emptyHolder = <div className="emptyHolder">空的</div>;

    return (
      <Col id={type} span="9" style={ type === 'expend' ? style : null }>
        <div className="base-panel-head">
          <h3>
            <Row>
              <Col span="6" style={ { fontSize: '2rem' } }>
                {type === 'income' ? '收入状况' : '支出状况'}
              </Col>
              <Col span="4" style={ { lineHeight: '30px' } }>
                <Button type="primary" size="small" onClick={this.handleClick}>
                  {type === 'income' ? '新增收入' : '新增支出'}
                </Button>
              </Col>
              <Col span="6" offset="8" style={ { lineHeight: '35px' } }>
                <span>{type === 'income' ? '共收入: ' : '共支出: '}</span>
                <span>{' ¥ ' + totalMoney}</span>
              </Col>
            </Row>
          </h3>
        </div>
        <div className="base-panel-list">
          <ul className="record-list" id="income-list">
            {listData.length === 0 ? emptyHolder : listData}
          </ul>
        </div>
        <div className="base-panel-chart">
          {
            chartData.length === 0 ?
              emptyHolder :
              <EChart data={chartData} name={type} type="pie" style={{width:"100%",height:"200px"}}/>
          }
        </div>
        <Modal type={type} visible={this.state[`${type}Visible`]}/>
      </Col>
    )
  }
});

module.exports = Income;
