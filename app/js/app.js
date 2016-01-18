import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Summary from './components/summary/summary-root'
import Income from './components/income/income-root'
import Expend from './components/expend/expend-root'
import Modal from './components/modal/new-record-modal'

import data from './data/income_doc.json'

import * as ActionCreators from './actions/action-creators';


var App = React.createClass({
    getInitialState(){
        return {
            incomeList: data.income
        }
    },
    componentWillReceiveProps(next){
        if(next.newIncomeData) {
            this.setState({
                incomeList: this.state.incomeList.concat(next.newIncomeData)
            })
        }
    },
    render(){
        let { dispatch } = this.props;
        let actionCreators = bindActionCreators(ActionCreators, dispatch);

        return (
            <div>
                <Summary />
                <div className="container">
                    <div className="row">
                        <Income data={this.state.incomeList} {...actionCreators}/>
                    </div>
                </div>
                <Modal data={this.props.modalData} {...actionCreators}/>
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {
        modalData: state.modalData,
        newIncomeData: state.newIncomeData
    }
}

export default connect(mapStateToProps)(App);