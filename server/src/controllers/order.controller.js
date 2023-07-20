/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');

const { Op } = require('sequelize');
const moment = require('moment');

const {
  Order,
  OrderService,
  Service,
  Cleaner,
  User,
} = require('../../db/models');

module.exports.orders = async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      order: [['id', 'ASC']],
      attributes: [
        'id',
        'info',
        'user_id',
        'cleaningTime',
        'address',
        'done',
        'rating',
        'price',
      ],
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
  } catch (err) {
    console.log(err);
  }
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
  try {
    const { orderEditId, cleanerId } = req.body;

    const order = await Order.findByPk(orderEditId);
    order.cleaner_id = cleanerId;
    order.save();

    const cleaner = await Cleaner.findByPk(cleanerId);
    res.json(cleaner.name);
  } catch (err) {
    console.log(err);
  }
};

module.exports.updatePrice = async (req, res) => {
  try {
    const { orderEditId, price } = req.body;
    // console.log(req.body);

    const order = await Order.findByPk(orderEditId);
    order.price = Number(price.replace(/\D[^\.]/g, ''));
    order.save();

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

module.exports.adminTab2Info = async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      raw: true,
      order: [['id', 'ASC']],
    });
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
  } catch (err) {
    console.log(err);
  }
};

module.exports.ordersCleanerPlanned = async (req, res) => {
  try {
    const { id } = req.session.cleaner;
    const cleanerPlannedOrders = await Order.findAll({
      where: { cleaner_id: id },
      order: [['id', 'ASC']],
      attributes: [
        'id',
        'info',
        'address',
        'cleaningTime',
        'user_id',
        'done',
        'price',
        'rating',
      ],
      include: [
        { model: User, attributes: ['userName', 'phoneNumber'] },
        {
          model: OrderService,
          attributes: ['id', 'order_id', 'service_id', 'amount'],
          include: {
            model: Service,
          },
        },
      ],
    });
    res.json(cleanerPlannedOrders);
  } catch (err) {
    console.log(err);
  }
  // console.log('----------> тук тук в ручку ordersCleanerPlanned!!!');
};

module.exports.ordersCleanerAvailable = async (req, res) => {
  // console.log('----------> тук тук в ручку ordersCleanerAvailable!!!');
  try {
    const { id } = req.session.cleaner;
    const cleanerAvailableOrders = await Order.findAll({
      raw: true,
      where: {
        cleaner_id: {
          [Op.is]: null,
        },
      },
      order: [['id', 'ASC']],
      attributes: [
        'id',
        'info',
        'address',
        'cleaner_id',
        'cleaningTime',
        'user_id',
        'done',
        'price',
        'rating',
      ],
      include: [
        { model: User, attributes: ['userName', 'phoneNumber'] },
        {
          model: OrderService,
          attributes: ['id', 'order_id', 'service_id', 'amount'],
          include: {
            model: Service,
          },
        },
      ],
    });
    // console.log('cleanerAvailableOrders----->', cleanerAvailableOrders);
    res.json(cleanerAvailableOrders);
  } catch (err) {
    console.log(err);
  }
};

module.exports.addOrder = async (req, res) => {
  // console.log(req.body);
  try {
    //! Вычленяю данные из req.body
    const { formData, formServices } = req.body;

    let user;
    if (req.session.user) {
      //! Проверяю, авторизован ли юзер, если сесси с юзером есть, то беру из сессии юзера, чтобы к нему присоединять order через user_id
      user = req.session.user;
    } else {
      //! если нет, то создаю юзера
      const password = '123';
      const hashPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        userName: formData.phoneNumber,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: hashPassword,
        isVerified: false,
      });

      //! А затем создаю сессию под него
      const userSessionData = {
        id: user.id,
        userName: user.userName,
        email: user.email,
        phone: user.phoneNumber,
      };
      req.session.user = userSessionData;
    }

    const address =
      formData.city + ', ' + formData.street + ', ' + formData.flat;

    const cleaningTime = new Date(
      moment(formData.date).format('YYYY-MM-DD') + ' ' + formData.time
    ).toString();
    //! Cоздаю заказ под юзера(опрделенного ли созданного)
    const newOrder = await Order.create({
      info: formData.info,
      user_id: Number(user.id),
      address,
      cleaningTime,
      done: false,
    });

    //! Через цикл создаю записи в OrderService

    for (let key of Object.keys(formServices)) {
      if (formServices[key] > 0) {
        // console.log(key + ' -> ' + formServices[key]);
        await OrderService.create({
          order_id: Number(newOrder.id),
          service_id: Number(key),
          amount: Number(formServices[key]),
        });
      }
    }

    //! Нахожу цену, чтобы её потом записать в заказ

    const orderServices = await OrderService.findAll({
      raw: true,
      nest: true,
      where: { order_id: newOrder.id },
      attributes: ['amount'],
      include: {
        model: Service,
        attributes: ['singlePrice'],
      },
    });

    let price = 0;
    orderServices.forEach((el) => {
      price += Number(el.amount) * Number(el.Service.singlePrice);
    });

    newOrder.price = price;
    newOrder.save();

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
