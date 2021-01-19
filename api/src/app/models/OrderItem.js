import Sequelize, { Model } from "sequelize";
import Order from "./Order";
import Product from "./Product";

class OrderItem extends Model {
    static init(sequelize) {
        super.init(
            {
                order_id        :  Sequelize.INTEGER,
                product_id      :  Sequelize.INTEGER,
                quantity        :  Sequelize.INTEGER,
                price           :  Sequelize.DECIMAL,
                created_at      :  Sequelize.DATE,
                updated_at      :  Sequelize.DATE,
            },
            {
                sequelize,
                name: {
                    singular    :  "order_item",
                    plural      :  "order_items"
                }
            }
        );

        this.belongsTo(Product, { foreignKey: 'product_id' });
    }
}

export default OrderItem;