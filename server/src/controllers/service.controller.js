const { Service } = require('../../db/models');

module.exports.servicesAll = async (req, res) => {
  const allServices = await Service.findAll({
    raw: true,
    attributes: ['id', 'title', 'singlePrice', 'default', 'single'],
  });
  res.json(allServices);
};
