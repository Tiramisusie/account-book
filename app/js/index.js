var React = require('react');
var ReactDOM = require('react-dom');

var Summary = require('./components/summary/summary');
var Income = require('./components/income/income');
var Expend = require('./components/expend/expend');
var Modal = require('./components/modal/newRecordModal');

import incomeData from './data/income_doc.json'
import expendData from './data/expend_doc.json'


var App = React.createClass({
    getInitialState(){
        return {
            incomeList: incomeData.income,
            expendList: expendData.expend
        }
    },
    componentWillReceiveProps(next){
        log(next);
        if(next.newIncomeData) {
            this.setState({
                incomeList: this.state.incomeList.concat(next.newIncomeData)
            })
        }
        if(next.newExpendData) {
            this.setState({
                expendList: this.state.expendList.concat(next.newExpendData)
            })
        }
    },
    render(){
        return (
            <div>
                <Summary />
                <div className="container">
                    <div className="row">
                        <Income data={this.state.incomeList}/>
                        <Expend data={this.state.expendList}/>
                    </div>
                </div>
                <Modal />
            </div>
        )
    }
});

ReactDOM.render(<App />, document.getElementById('app'));