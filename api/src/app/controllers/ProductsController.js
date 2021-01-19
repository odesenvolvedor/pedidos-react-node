import Validator from "../validators/Validator";
import ProductService from "../services/ProductService";
import Response from "../helpers/Response";

class ProductsController {

    async index(req, res) {
        return Response.makeResponse(res, await ProductService.index(req));
    }

    async show(req, res) {
        const product = await ProductService.show(req);
        return Response.makeResponse(res, product, !product ? 404 : 201);
    }

    async create(req, res) {

        const schema = Validator.yup().object().shape({
            name    : Validator.yup().string().required(),
            price   : Validator.yup().number().required(),
        });

        const errors = await Validator.validate(schema, req.body)

        if (errors) {
            return Response.makeResponse(res, errors, 422);
        }

        return Response.makeResponse(res, await ProductService.create(req), 201);
    }

    async update(req, res) {

        const schema = Validator.yup().object().shape({
            name        : Validator.yup().string().required(),
            price       : Validator.yup().number().required(),
        });

        const errors = await Validator.validate(schema, req.body)
        
        if (errors) {
            return Response.makeResponse(res, errors, 422);
        }

        const product = await ProductService.update(req);

        return Response.makeResponse(res, product, !product ? 404 : 201);

    }

    async destroy(req, res) {
        
        await ProductService.destroy(req);

        return Response.makeResponse(res);
    }
}

export default new ProductsController();