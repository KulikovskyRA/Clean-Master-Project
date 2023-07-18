const { Service } = require('../../db/models');

module.exports.servicesAll = async (req, res) => {
  const allServices = await Service.findAll({
    raw: true,
    attributes: ['id', 'title', 'singlePrice', 'default', 'single'],
    order: [['id', 'ASC']],
  });
  res.json(allServices);
};

module.exports.serviceEdit = async (req, res) => {
  const { title, price, single } = req.body;

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
};

module.exports.serviceDelete = async (req, res) => {
  Service.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
};

module.exports.serviceNew = async (req, res) => {
  const { title, price, singleImp } = req.body;
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
};
