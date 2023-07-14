'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderService extends Model {
    static associate({ Order, Service }) {
      this.belongsTo(Order, { foreignKey: 'order_id' });
      this.belongsTo(Service, { foreignKey: 'service_id' });
    }
  }
  OrderService.init(
    {
      order_id: DataTypes.INTEGER,
      service_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderService',
    }
  );
  return OrderService;
};
