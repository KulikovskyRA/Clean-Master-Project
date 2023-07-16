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
    attributes: ['id', 'cleaningTime', 'address', 'done', 'rating'],
    include: [
      { model: Cleaner, attributes: ['name'] },
      { model: User, attributes: ['userName'] },
      {
        model: OrderService,
        attributes: ['id', 'order_id', 'service_id', 'amount'],
        include: {
          model: Service,
        },
      },
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
  const { orderEditId, cleanerId } = req.body;

  const order = await Order.findByPk(orderEditId);
  order.cleaner_id = cleanerId;
  order.save();

  const cleaner = await Cleaner.findByPk(cleanerId);
  res.json(cleaner.name);
};

module.exports.adminTab2Info = async (req, res) => {
  const allOrders = await Order.findAll({ raw: true });
  const done = allOrders.filter((el) => el.done === true);
  // console.log(allOrders);
  // console.log(done);

  const allNumber = allOrders.length;
  const doneNumber = done.length;

  let oborot = 0;

  done.forEach((element) => {
    oborot += element.price;
  });

  const cleanerSalary = Math.round(oborot * 0.2);
  const money = oborot - cleanerSalary;

  res.json({ allNumber, doneNumber, oborot, cleanerSalary, money });
};
