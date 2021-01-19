import Validator from "../validators/Validator";
import OrderService from "../services/OrderService";
import Response from "../helpers/Response";

class OrdersController {

    async index(req, res) {
        return Response.makeResponse(res, await OrderService.index(req));
    }

    async show(req, res) {
        const order = await OrderService.show(req);
        return Response.makeResponse(res, order, !order ? 404 : 201);
    }

    async create(req, res) {

        const schema = Validator.yup().object().shape({
            customer_id : Validator.yup().number().required(),
            order_items : Validator.yup().array().of(
                
                Validator.yup().object().shape({
                    product_id  : Validator.yup().number().required(),
                    quantity    : Validator.yup().number().required(),
                    price       : Validator.yup().number().required(),
                })

            ).required(),
        });

        const errors = await Validator.validate(schema, req.body)

        if (errors) {
            return Response.makeResponse(res, errors, 422);
        }

        return Response.makeResponse(res, await OrderService.create(req), 201);
    }

    async update(req, res) {

        const schema = Validator.yup().object().shape({
            customer_id : Validator.yup().string().required(),
            order_items    : Validator.yup().array().required(),
        });

        const errors = await Validator.validate(schema, req.body)
        
        if (errors) {
            return Response.makeResponse(res, errors, 422);
        }

        const order = await OrderService.update(req);

        return Response.makeResponse(res, order, !order ? 404 : 201);

    }

    async destroy(req, res) {
        
        await OrderService.destroy(req);

        return Response.makeResponse(res);
    }
}

export default new OrdersController();