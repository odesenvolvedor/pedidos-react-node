import Sequelize, { Model } from "sequelize";

class Customer extends Model {
    static init(sequelize) {
        super.init(
            {
                name            :  Sequelize.STRING,
                phone        :  Sequelize.STRING,
                birth_date :  Sequelize.DATE,
                created_at      :  Sequelize.DATE,
                updated_at      :  Sequelize.DATE,
            },
            {
                sequelize,
                name: {
                    singular    :  "customer",
                    plural      :  "customers"
                }
            }
        );

        this.addHook("beforeSave", async customer => {
            if (customer.phone) {
                customer.phone = customer.phone.replace(/[^\d]+/g, '');
            }
        });
    }
}

export default Customer;