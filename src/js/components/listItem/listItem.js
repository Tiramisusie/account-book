/**
 * Created by liangningcong on 16/1/7.
 */
var React = require('react');

var Item = React.createClass({
    render(){
        return (
            <li className={this.props.className}>
                <span className="record-type">{this.props.data.type}</span>
                <span className="record-amount">
                    <span className="record-currency">¥</span>
                    <span className="record-money">{this.props.data.money}</span>
                </span>
            </li>
        )
    }
});

module.exports = Item;