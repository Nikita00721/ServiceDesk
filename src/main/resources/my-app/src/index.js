import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import RequestEdit from './RequestEdit';
import RequestByType from './RequestByType';
import TypeEdit from './TypeEdit';
import Types from './Types';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/request-edit/:id" component={RequestEdit} />
      <Route path="/request-by-type/:id" component={RequestByType} />
      <Route path="/type-edit/:id" component={TypeEdit} />
      <Route path="/types" component={Types} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
