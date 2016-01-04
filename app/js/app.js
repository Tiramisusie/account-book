import React from 'react';
import ReactDOM from 'react-dom';
import Summary from './component/summary/root'


var App = React.createClass({
    render(){
        return (
            <div>
				<Summary />
            </div>
        )
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);