const bcrypt = require('bcrypt');

const {
  Order,
  OrderService,
  Service,
  Cleaner,
  User,
} = require('../../db/models');

module.exports.orders = async (req, res) => {
  const allOrders = await Order.findAll({
    include: [
      { model: Cleaner },
      { model: User },
      { model: OrderService, include: { model: Service } },
    ],
  });
  res.json(allOrders);
};

module.exports.deleteOrder = async (req, res) => {
  try {
    await Order.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

// const games = await Game.findAll({
//     include: { model: User },
//     order: [['score', 'DESC']],
//     limit: 10,
//   });
