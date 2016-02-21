var React = require('react');
var ReactDOM = require('react-dom');

var Summary = require('./components/summary/summary');
var BasePanel = require('./components/basePanel/basePanel');

import incomeData from './data/income_doc.json'
import expendData from './data/expend_doc.json'


var App = React.createClass({
    getInitialState(){
        return {
            incomeList: incomeData.income,
            expendList: expendData.expend
        }
    },
    render(){
        return (
            <div>
                <Summary />
                <div className="container">
                    <div className="row">
                        <BasePanel data={incomeData.income} type="income"/>
                        <BasePanel data={expendData.expend} type="expend"/>
                    </div>
                </div>
            </div>
        )
    }
});

ReactDOM.render(<App />, document.getElementById('app'));