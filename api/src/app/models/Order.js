import Sequelize, { Model, Op } from "sequelize";
import Customer from "./Customer";
import OrderItem from "./OrderItem";

class Order extends Model {
    static init(sequelize) {
        super.init(
            {
                order_number:  Sequelize.BIGINT,
                customer_id :  Sequelize.INTEGER,
                created_at  :  Sequelize.DATE,
                updated_at  :  Sequelize.DATE,
            },
            {
                sequelize,
                name: {
                    singular    :  "order",
                    plural      :  "orders"
                }
            }
        );

        this.belongsTo( Customer,        { foreignKey: 'customer_id' });
        this.hasMany(   OrderItem,  { foreignKey: 'order_id' });

        this.addHook("beforeSave", async order => {
            if (order.order_number == null) {
                //Gera numero do order
                order.order_number = "" + new Date().getTime() + order.customer_id;
            }
        });
    }
}

export default Order;