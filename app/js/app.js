/**
 * Created by liangningcong on 15/12/13.
 */
var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
    render: function(){
        return (
            <div>hello world</div>
        )
    }
});

ReactDOM.render(<App />, document.getElementsByClassName('app')[0]);