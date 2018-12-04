'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    messege: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};