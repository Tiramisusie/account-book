var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({
	getInitialState(){
		return ({
			name: 'susie'
		})
	},

    render(){
        return (
            <div>
				hello {this.state.name}
            </div>
        )
    }
});

ReactDOM.render(
    <Hello />,
    document.getElementById('app')
);