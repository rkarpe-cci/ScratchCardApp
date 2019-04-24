'use strict';
module.exports = (sequelize, DataTypes) => {
  const scratchCards = sequelize.define('scratchCards', {
    amount: DataTypes.DOUBLE,
    scratchCardExpiryDate: DataTypes.DATE,
    scratched: DataTypes.TINYINT,
    isactive: DataTypes.TINYINT
  }, {});
  scratchCards.associate = function (models) {
    // associations can be defined here
    scratchCards.hasMany(models.transactions, {
      foreignKey: 'scratchCardId',
      as: 'Cards',
    });
  };
  return scratchCards;
};