'use strict';

const socket = require('../realtime/client'); //Socket conectado al servidor

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.TEXT
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, {
      as: 'user'
    });

    Task.belongsToMany(models.Category, {
      through: 'TaskCategories',
      as: 'categories'
    });

    Task.afterCreate((task, options) => {
      socket.emit('new_task', task)
    });

  };
  return Task;
};
