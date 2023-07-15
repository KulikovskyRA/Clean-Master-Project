const bcrypt = require('bcrypt');

const {
  Order,
  OrderService,
  Service,
  Cleaner,
  User,
} = require('../../db/models');

// const clList = await Cleaner.findAll({
//   raw: true,
//   attributes: ['id', 'name', 'phoneNumber', 'nation', 'pets'],
// });

module.exports.orders = async (req, res) => {
  const allOrders = await Order.findAll({
    attributes: ['id', 'cleaningTime', 'address', 'done', 'rating'],
    include: [
      { model: Cleaner, attributes: ['name'] },
      { model: User, attributes: ['userName'] },
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

module.exports.updateCleaner = async (req, res) => {
  // console.log(req.body);
  const { orderEditId, cleanerId } = req.body;

  const order = await Order.findByPk(orderEditId);
  order.cleaner_id = cleanerId;
  order.save();

  const cleaner = await Cleaner.findByPk(cleanerId);

  res.json(cleaner.name);
  // res.sendStatus(200);
};
