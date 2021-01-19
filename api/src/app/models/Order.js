import Sequelize, { Model } from "sequelize";
import Customer from "./Customer";
import OrderItem from "./OrderItem";

class Order extends Model {
    static init(sequelize) {
        super.init(
            {
                order_number:  Sequelize.BIGINT,
                customer_id :  Sequelize.INTEGER,
                amount      :  Sequelize.DECIMAL,
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
            if (order.order_number) {
                //Gera numero do order
                order.order_number = null == order.order_number
                    ? "" + new Date(dateStr).getTime() + order.customer_id
                    : order.order_number;
            }
        });
    }
}

export default Order;