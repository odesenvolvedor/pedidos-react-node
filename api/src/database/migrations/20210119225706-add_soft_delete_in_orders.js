'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('orders', "deleted_at", {
        allowNull: true,
        type: DataTypes.DATE,
      }
    );
  },

  down: async (queryInterface, DataTypes) => {
    return queryInterface.removeColumn(
      'orders',
      'deleted_at'
    );
  }
};
