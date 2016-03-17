import React from 'react'
import Records from './Records'
import constant from '../../constants/accountConstants'
import EventStore from '../../stores/EventStore'
import AccountStore from '../../stores/AccountStore'
import { Row, Col } from 'antd'

var Main = React.createClass ({
    getInitialState(){
        return {
            incomeList: [],
            expendList: []
        }
    },

    componentDidMount(){
        EventStore.addEventChangeListener(constant.GET_RECORDS, this.handleLocalRecords);
        AccountStore.getRecords();
    },

    componentWillUnmount(){
        EventStore.removeEventChangeListener(constant.GET_RECORDS, this.handleLocalRecords);
    },

    handleLocalRecords(data){
        var state = data ? data : {income:[], expend:[]};
        this.setState({
            incomeList: state.income,
            expendList: state.expend
        })
    },

    render() {
        return (
            <Col span="21" className="panel-container">
                <Row type="flex" justify="start">
                    <Records data={this.state.incomeList} type="income"/>
                    <Records data={this.state.expendList} type="expend"/>
                </Row>
            </Col>
        )
    }
});

export default Main;