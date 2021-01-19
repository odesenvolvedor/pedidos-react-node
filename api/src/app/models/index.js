import Sequelize from "sequelize";

import config from "../../config/database";

import Customer from "./Customer";
import Product from "./Product";
import Order from "./Order";
import OrderItem from "./OrderItem";

const models = [Customer, Product, OrderItem, Order];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
    this.associate();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();