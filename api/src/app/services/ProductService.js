import { Op } from "sequelize";
import { parseISO } from "date-fns";

import Product from "../models/Product";

class ProductService {

    async index(req) {
        const {
            name,
            price,
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

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name,
                },
            };
        }

        if (price) {
            where = {
                ...where,
                price: {
                    [Op.iLike]: price,
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

        const data = await Product.findAll({
            attributes: ['id', 'name', 'price', 'createdAt', 'updatedAt'],
            where: where,
            order: order,
            limit: limit,
            offset: limit * page - limit,
        });

        return data;
    }

    async show(req) {
        const product = await Product.findByPk(req.params.id, {
            attributes: { exclude: [] },
        });
        return product;
    }

    async create(req) {
    
        const { id, name, price, createdAt, updatedAt } = await Product.create(
            req.body
        );

        return { id, name, price, createdAt, updatedAt };
    }

    async update(req, res) {

        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return null;
        }

        const { id, name, price, createdAt, updatedAt } = await product.update(
            req.body
        );

        return { id, name, price, createdAt, updatedAt };
    }

    async destroy(req) {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return null;
        }

        await product.destroy();
    }
}

export default new ProductService();