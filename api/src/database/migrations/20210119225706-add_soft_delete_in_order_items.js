'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('order_items', "deleted_at", {
        allowNull: true,
        type: DataTypes.DATE,
      }
    );
  },

  down: async (queryInterface, DataTypes) => {
    return queryInterface.removeColumn(
      'order_items',
      'deleted_at'
    );
  }
};
