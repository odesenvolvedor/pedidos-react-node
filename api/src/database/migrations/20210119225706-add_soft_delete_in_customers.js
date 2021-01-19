'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('customers', "deleted_at", {
        allowNull: true,
        type: DataTypes.DATE,
      }
    );
  },

  down: async (queryInterface, DataTypes) => {
    return queryInterface.removeColumn(
      'customers',
      'deleted_at'
    );
  }
};
