/* eslint-disable linebreak-style */
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
    order: [['id', 'ASC']],
    attributes: ['id', 'cleaningTime', 'address', 'done', 'rating', 'price'],
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

//

module.exports.updatePrice = async (req, res) => {
  const { orderEditId, price } = req.body;
  console.log(req.body);

  const order = await Order.findByPk(orderEditId);
  order.price = Number(price.replace(/\D[^\.]/g, ''));
  order.save();

  res.sendStatus(200);
};

module.exports.adminTab2Info = async (req, res) => {
  const allOrders = await Order.findAll({ raw: true, order: [['id', 'ASC']] });
  const done = allOrders.filter((el) => el.done === true);

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

//! переписать на findByPk, это для отображения списка запланированных уборок в ЛК клинера - 
//! ловить в pages -> Cleaner -> Cleaner.tsx -> <CleanerOrdersTabs /> -> ...
// module.exports.ordersCleanerPlanned = async (req, res) => {
//   const cleanerPlannedOrders = await Order.findAll({
//     order: [['id', 'ASC']],
//     attributes: ['id', 'info', 'address', 'cleaningTime', 'user_id', 'done', 'price', 'rating'],
//     include: [
//       { model: User, attributes: ['userName', 'phoneNumber'] },
//       {
//         model: OrderService,
//         attributes: ['id', 'order_id', 'service_id', 'amount'],
//         include: {
//           model: Service,
//         },
//       },
//     ],
//   });
//   res.json(cleanerPlannedOrders);
// };
