import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";

import Customer from "../models/Customer";

class CustomerService {

    async index(req) {
        const {
            name,
            phone,
            birthDateBefore,
            birthDateAfter,
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

        if (phone) {
            where = {
                ...where,
                phone: {
                    [Op.iLike]: phone,
                },
            };
        }

        if (birthDateBefore) {
            where = {
                ...where,
                birth_date: {
                    [Op.gte]: parseISO(birthDateBefore),
                },
            };
        }

        if (birthDateAfter) {
            where = {
                ...where,
                birth_date: {
                    [Op.lte]: parseISO(birthDateAfter),
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

        const data = await Customer.findAll({
            attributes: ['id', 'name', 'phone', 'birth_date', 'createdAt', 'updatedAt'],
            where: where,
            order: order,
            limit: limit,
            offset: limit * page - limit,
        });

        return data;
    }

    async show(req) {
        const customer = await Customer.findByPk(req.params.id, {
            attributes: { exclude: [] },
        });
        return customer;
    }

    async create(req) {
    
        const { id, name, phone, birth_date, createdAt, updatedAt } = await Customer.create(
            req.body
        );

        return { id, name, phone, birth_date, createdAt, updatedAt };
    }

    async update(req, res) {

        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return null;
        }

        const { id, name, phone, birth_date, createdAt, updatedAt } = await customer.update(
            req.body
        );

        return { id, name, phone, birth_date, createdAt, updatedAt };
    }

    async destroy(req) {
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return null;
        }

        await customer.destroy();
    }
}

export default new CustomerService();