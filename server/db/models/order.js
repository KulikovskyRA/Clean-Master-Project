'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ User, Cleaner, OrderService }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Cleaner, { foreignKey: 'cleaner_id' });
      this.hasMany(OrderService, { foreignKey: 'order_id' });
    }
  }
  Order.init(
    {
      info: DataTypes.TEXT,
      address: DataTypes.STRING,
      cleaningTime: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
      cleaner_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      done: DataTypes.BOOLEAN,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
