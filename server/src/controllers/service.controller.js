const { Service } = require('../../db/models');

module.exports.servicesAll = async (req, res) => {
  try {
    const allServices = await Service.findAll({
      raw: true,
      attributes: ['id', 'title', 'singlePrice', 'default', 'single'],
      order: [['id', 'ASC']],
    });
    res.json(allServices);
  } catch (err) {
    console.log(err);
  }
};

module.exports.singlePriceServices = async (req, res) => {
  try {
    const serviceList = await Service.findAll({
      where: { single: true, default: false },
      raw: true,
      attributes: ['id', 'title', 'singlePrice', 'default', 'single'],
      order: [['id', 'ASC']],
    });
    res.json(serviceList);
  } catch (err) {
    console.log(err);
  }
};

module.exports.noSinglePriceServices = async (req, res) => {
  try {
    const serviceList = await Service.findAll({
      where: { single: false, default: false },
      raw: true,
      attributes: ['id', 'title', 'singlePrice', 'default', 'single'],
      order: [['id', 'ASC']],
    });
    res.json(serviceList);
  } catch (err) {
    console.log(err);
  }
};

module.exports.serviceEdit = async (req, res) => {
  const { title, price, single } = req.body;
  try {
    const service = await Service.findByPk(req.params.id);
    if (title && title !== '') {
      service.title = title;
    }
    if (price && price !== '') {
      service.singlePrice = Number(price.replace(/\D[^\.]/g, ''));
    }
    if (typeof single !== 'undefined') {
      service.single = single;
    }

    service.save();

    const toSend = {
      id: service.id,
      title: service.title,
      singlePrice: service.singlePrice,
      default: service.default,
      single: service.single,
    };

    res.status(200).json(toSend);
  } catch (err) {
    console.log(err);
  }
};

module.exports.serviceDelete = async (req, res) => {
  try {
    Service.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

module.exports.serviceNew = async (req, res) => {
  const { title, price, singleImp } = req.body;
  try {
    const single = singleImp ?? false;

    const newService = await Service.create({
      title,
      singlePrice: Number(price.replace(/\D[^\.]/g, '')),
      single,
      default: false,
    });

    const toSend = {
      id: newService.id,
      title: newService.title,
      singlePrice: newService.singlePrice,
      default: newService.default,
      single: newService.single,
    };

    res.status(200).json(toSend);
  } catch (err) {
    console.log(err);
  }
};
