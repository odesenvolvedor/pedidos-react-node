'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('products', "deleted_at", {
        allowNull: true,
        type: DataTypes.DATE,
      }
    );
  },

  down: async (queryInterface, DataTypes) => {
    return queryInterface.removeColumn(
      'products',
      'deleted_at'
    );
  }
};
