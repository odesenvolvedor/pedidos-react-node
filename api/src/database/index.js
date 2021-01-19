import Sequelize from "sequelize";

import config from "../config/database";

import Customer from "../app/models/Customer";
import Product from "../app/models/Product";
import Order from "../app/models/Order";
import OrderItem from "../app/models/OrderItem";

const models = [Customer, Product, Order, OrderItem];

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
        console.log("construtor database");
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