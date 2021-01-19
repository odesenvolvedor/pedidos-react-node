'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      order_number: {
        allowNull: false,
        type: DataTypes.BIGINT(20).UNSIGNED,
      },
      customer_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'customers', key: 'id' }
      },
      amount: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('orders');
  }
};
