import { Op } from "sequelize";
import { parseISO } from "date-fns";

import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import Customer from "../models/Customer";
import Product from "../models/Product";

class OrderService {

    async index(req) {
        const {
            customer_id,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = {};
        let order = [];

        if (customer_id) {
            where = {
                ...where,
                customer_id: {
                    [Op.eq]: customer_id,
                },
            };
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore),
                },
            };
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter),
                },
            };
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore),
                },
            };
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter),
                },
            };
        }

        if (sort) {
            order = sort.split(",").map(item => item.split(":"));
        }

        const data = await Order.findAll({
            include: [ {model: Customer}],
            where: where,
            order: order,
            limit: limit,
            offset: limit * page - limit,
        });

        return data;
    }

    async show(req) {
        const order = await Order.findByPk(req.params.id, {
            attributes: { exclude: [] },
            include: [
                { model: Customer },
                { model: OrderItem, include: [Product] },
            ],
        });
        return order;
    }

    async create(req) {
    
        const { id, customer_id, createdAt, updatedAt } = await Order.create(
            req.body, { include: [ OrderItem ] }
        );

        return { id, customer_id, createdAt, updatedAt };
    }

    async update(req) {

        const order = await this.show(req);

        if (!order) {
            return null;
        }

        req.body.order_items.forEach( async (item) => {
            
            if (item.isDeleted && item.id) {
                const orderItem = await OrderItem.findByPk(item.id);
                if (orderItem) {
                    await orderItem.destroy();
                }
            }

            if (!item.id) {
                await OrderItem.create(item);
            } else {
                const orderItem = await OrderItem.findByPk(item.id);
                if (orderItem) {
                    orderItem.update(item);
                }
            }

        });
        
        await order.update(
            req.body, { include: [OrderItem] }
        );

        const orderSaved = await this.show(req);
        return orderSaved;
    }

    async destroy(req) {
        const order = await this.show(req);

        if (!order) {
            return null;
        }

        order.order_items.forEach(async item => await item.destroy());

        await order.destroy();
    }
}

export default new OrderService();