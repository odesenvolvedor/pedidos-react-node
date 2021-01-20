import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Customers from './pages/Customers';
import Layout from './layout';
import AddCustomer from './pages/Customers/add.component';
import Products from './pages/Products';
import AddProduct from './pages/Products/add.component';
import Orders from './pages/Orders';
import AddOrder from './pages/Orders/add.component';

const history = createBrowserHistory();

export default function Routes() {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/clientes" component={Customers} exact />
          <Route path="/clientes/adicionar" component={AddCustomer} exact />
          <Route path="/produtos" component={Products} exact />
          <Route path="/produtos/adicionar" component={AddProduct} exact />
          <Route path="/pedidos" component={Orders} exact />
          <Route path="/pedidos/adicionar" component={AddOrder} exact />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}
