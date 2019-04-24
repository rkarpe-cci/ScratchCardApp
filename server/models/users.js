'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.TINYINT,
    },
  });
  users.associate = function (models) {
    // associations can be defined here
    users.hasMany(models.transactions, {
      foreignKey: 'uId',
      as: 'Cards',
    });
  };
  return users;
};