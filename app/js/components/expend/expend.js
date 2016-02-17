/**
 * Created by liangningcong on 16/1/4.
 */
var React = require('react');
var ListItem = require('../ListItem/listItem');
var MyChart = require('../chart/chart');

var Expend = React.createClass({
    getInitialState(){
        return this._renderListItem(this.props);
    },
    componentWillReceiveProps(nextprops){
        var tmpObj = this._renderListItem(nextprops);
        this.setState({
            totalMoney: tmpObj.totalMoney,
            listData: tmpObj.listData
        })
    },
    _renderListItem(props){
        var itemArr = [],
            totalMoney = 0,
            listData = props.data;

        for(var i=0, len=listData.length; i<len; i++) {
            //生成列表项
            itemArr.push(<ListItem key={i} className='expendItem' data={listData[i]} />);
            //计算总金额
            totalMoney += listData[i].money * 1;
        }

        return {
            listData: itemArr,
            totalMoney: totalMoney
        };
    },
    _addNewExpend(e){
        e.preventDefault();
        this.props.addExpend();
        $('#recordModal').modal('show');
    },
    render(){
        return (
            <div id="expend" className="base-panel">
                <div className="base-panel-head">
                    <h3 className="total-title">
                        总支出
                        <span className="total-money">
                            <span className="total-currency">CNY</span>
                            <span className="total-num">{this.state.totalMoney}</span>
                        </span>
                    </h3>
                </div>
                <div className="base-panel-list">
                    <ul className="record-list" id="expend-list">
                        {this.state.listData}
                    </ul>

                    <div className="btns-list">
                        <a href="#" onClick={this._addNewExpend} className="add-record" title="新增支出">+</a>
                    </div>
                </div>
                <div className="base-panel-chart">
                    <MyChart data={this.props.data} type="expend"/>
                </div>
            </div>
        )
    }
});

module.exports = Expend;
