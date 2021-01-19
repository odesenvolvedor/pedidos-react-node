import Validator from "../validators/Validator";
import CustomerService from "../services/CustomerService";
import Response from "../helpers/Response";

class CustomersController {

    async index(req, res) {
        return Response.makeResponse(res, await CustomerService.index(req));
    }

    async show(req, res) {
        const customer = await CustomerService.show(req);
        return Response.makeResponse(res, customer, !customer ? 404 : 201);
    }

    async create(req, res) {

        const schema = Validator.yup().object().shape({
            name        : Validator.yup().string().required(),
            phone       : Validator.yup().string().required(),
            birth_date  : Validator.yup().date().required(),
        });

        const errors = await Validator.validate(schema, req.body)

        if (errors) {
            return Response.makeResponse(res, errors, 422);
        }

        return Response.makeResponse(res, await CustomerService.create(req), 201);
    }

    async update(req, res) {

        const schema = Validator.yup().object().shape({
            name        : Validator.yup().string().required(),
            phone       : Validator.yup().string().required(),
            birth_date  : Validator.yup().date().required(),
        });

        const errors = await Validator.validate(schema, req.body)
        
        if (errors) {
            return Response.makeResponse(res, errors, 422);
        }

        const customer = await CustomerService.update(req);

        return Response.makeResponse(res, customer, !customer ? 404 : 201);

    }

    async destroy(req, res) {
        
        await CustomerService.destroy(req);

        return Response.makeResponse(res);
    }
}

export default new CustomersController();