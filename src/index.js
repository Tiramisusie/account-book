import React from 'react';
import ReactDOM from 'react-dom';
import Header from './js/components/header/Header';
import Daily from './js/components/daily/Daily';
import Summary from './js/components/summary/Summary';
import Monthly from './js/components/monthly/Monthly';
import { Row, Col, Button, Menu } from 'antd';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';
require("!style!css!less!./css/app.less");

var App = React.createClass( {
  render() {
    return (
      <div>
        <Header routePath={this.props.location.pathname} />
        <Row>
          <Col span="3" style={ { zIndex: '2', marginRight: '-1px' } }>
            <nav>
              <ul className="nav-ul">
                <li className="nav-link">
                  <Link to="/daily" activeClassName="activeLink" >记一笔</Link>
                </li>
                <li className="nav-link">
                  <Link to="/monthly" activeClassName="activeLink" >月度统计</Link>
                </li>
              </ul>
            </nav>
          </Col>
          {this.props.children}
        </Row>
      </div>
    )
  }
});

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Daily} />
      <Route path="/daily" component={Daily} />
      <Route path="/summary" component={Summary} />
      <Route path="/monthly" component={Monthly} />
    </Route>
  </Router>,
  document.getElementById('app')
);