'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    amount: DataTypes.DOUBLE,
    dateofTransaction: DataTypes.DATE
  }, {});
  transactions.associate = function (models) {
    // associations can be defined here
    transactions.belongsTo(models.users, {
      foreignKey: 'uId',
      onDelete: 'CASCADE',
    });
    transactions.belongsTo(models.scratchCards, {
      foreignKey: 'scratchCardId',
      onDelete: 'CASCADE',
    });
  };
  return transactions;
};