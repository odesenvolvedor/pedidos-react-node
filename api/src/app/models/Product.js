import Sequelize, { Model } from "sequelize";

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name        :  Sequelize.STRING,
                price       :  Sequelize.DECIMAL,
                created_at  :  Sequelize.DATE,
                updated_at  :  Sequelize.DATE,
            },
            {
                sequelize,
                name: {
                    singular:  "product",
                    plural  :  "products"
                }
            }
        );
    }
}

export default Product;