'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.removeColumn(
      'orders',
      'amount'
    );
  },

  down: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('orders',
      "amount", {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
    );
  }
};
