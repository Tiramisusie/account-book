import React from 'react';
import ReactDOM from 'react-dom';

import Summary from './component/summary/root'
import Income from './component/income/root'
import Outcome from './component/outcome/root'


var App = React.createClass({
    render(){
        return (
            <div>
				<Summary />
                <Income />
                <Outcome />
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);