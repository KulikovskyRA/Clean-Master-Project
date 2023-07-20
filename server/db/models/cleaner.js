'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cleaner extends Model {
    static associate({ Order }) {
      this.hasMany(Order, { foreignKey: 'cleaner_id' });
    }
  }
  Cleaner.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      patrname: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      nation: DataTypes.STRING,
      pets: DataTypes.BOOLEAN,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Cleaner',
    }
  );
  return Cleaner;
};
