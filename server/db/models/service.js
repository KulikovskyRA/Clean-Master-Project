'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate({ OrderService }) {
      this.hasMany(OrderService, { foreignKey: 'service_id' });
    }
  }
  Service.init(
    {
      title: DataTypes.STRING,
      singlePrice: DataTypes.INTEGER,
      default: DataTypes.BOOLEAN,
      single: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Service',
    }
  );
  return Service;
};
