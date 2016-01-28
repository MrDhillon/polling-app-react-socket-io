var React = require('react');
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory,IndexRoute } from 'react-router'
import {createHashHistory} from 'history';
let history = createHashHistory();

var APP      = require("./components/APP");
var Audience = require("./components/Audience");
var Speaker  = require("./components/Speaker");
var Board    = require("./components/Board");
var NoMatch  = require("./components/NoMatch");

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={APP}>
      <IndexRoute component ={Audience} />
      <Route path="speaker" component={Speaker}/>
      <Route path="board" component={Board}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
  ),document.getElementById('react-container'));
