'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tasks', 'userId',{
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tasks', 'userId');
  }
};
