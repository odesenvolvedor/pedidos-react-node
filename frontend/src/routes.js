import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Customers from './pages/Customers';
import Layout from './layout';

const history = createBrowserHistory();

export default function Routes() {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/clientes" component={Customers} exact />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}
