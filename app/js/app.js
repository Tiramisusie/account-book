import React from 'react';
import ReactDOM from 'react-dom';

import Summary from './component/summary/root'
import Income from './component/income/root'
import Outcome from './component/outcome/root'

import data from './data/income_doc.json'


var App = React.createClass({
    render(){
        return (
            <div>
				<Summary />
                <div className="container">
                    <div className="row">
                        <Income data={data}/>

                    </div>
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);