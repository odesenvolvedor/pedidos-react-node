import { Router } from "express";

import customers from "./app/controllers/CustomersController";
import products from "./app/controllers/ProductsController";
import orders from "./app/controllers/OrdersController";

const routes = new Router();

// Customers
routes.get   ("/customers"      , customers.index);
routes.get   ("/customers/:id"  , customers.show);
routes.post  ("/customers"      , customers.create);
routes.put   ("/customers/:id"  , customers.update);
routes.delete("/customers/:id"  , customers.destroy);

// Products
routes.get   ("/products"       , products.index);
routes.get   ("/products/:id"   , products.show);
routes.post  ("/products"       , products.create);
routes.put   ("/products/:id"   , products.update);
routes.delete("/products/:id"   , products.destroy);

// Orders
routes.get   ("/orders"         , orders.index);
routes.get   ("/orders/:id"     , orders.show);
routes.post  ("/orders"         , orders.create);
routes.put   ("/orders/:id"     , orders.update);
routes.delete("/orders/:id"    , orders.destroy);

export default routes;