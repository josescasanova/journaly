import React  from 'react';
import ReactDOM  from 'react-dom';

import { Router, Route } from 'react-router';
import { createHistory } from 'history';

/**
 * Import Components
 */
import LandingPage from './components/LandingPage';
import NotFound from './components/NotFound';
import App from './components/App';

/*
  Routes
*/
var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={LandingPage}/>
    <Route path="/user/:uid" component={App}/>
    <Route path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
