'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable('order_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      order_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'orders', key: 'id' }
      },
      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'products', key: 'id' }
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      price: {
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
    return queryInterface.dropTable('order_products');
  }
};

