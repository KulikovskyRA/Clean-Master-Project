/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');

const { Cleaner, Order, User } = require('../../db/models');

module.exports.cleanerLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const check = await Cleaner.findOne({ where: { phoneNumber }, raw: true });
    if (check) {
      const hashPass = await bcrypt.compare(password, check.password);

      if (hashPass) {
        const cleaner = {
          id: check.id,
          name: check.name,
          phoneNumber: check.phoneNumber,
        };
        req.session.cleaner = cleaner;
        res.status(200).json({
          id: check.id,
          phoneNumber: check.phoneNumber,
          name: check.name,
          surname: check.surname,
          patrname: check.patrname,
          nation: check.nation,
          img: check.img,
          auth: true,
        });
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

module.exports.cleanerRegister = async (req, res) => {
  const { name, surname, patrname, phoneNumber, nation, password, pets } =
    req.body;
  try {
    const isCleanerExist =
      (await Cleaner.findOne({ where: { phoneNumber }, raw: true })) !== null;

    if (isCleanerExist) {
      res.sendStatus(403);
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const cleanerData = await Cleaner.create({
      name,
      surname,
      patrname,
      nation,
      password: hashPassword,
      phoneNumber,
      pets,
    });

    const cleaner = { name, surname, patrname, nation, phoneNumber, pets };

    req.session.cleaner = cleaner;

    res.json({ cleaner });
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.cleanersList = async (req, res) => {
  try {
    const clList = await Cleaner.findAll({
      order: [['id', 'ASC']],
      attributes: [
        'id',
        'name',
        'surname',
        'patrname',
        'phoneNumber',
        'nation',
        'pets',
      ],
      include: { model: Order, attributes: ['rating'] },
    });

    res.json(clList);
  } catch (err) {
    console.log(err);
  }
};

module.exports.cleanerInfo = async (req, res) => {
  try {
    const { id } = req.session.cleaner;
    const getCleaner = await Cleaner.findByPk(id, {
      attributes: [
        'id',
        'name',
        'surname',
        'patrname',
        'phoneNumber',
        'nation',
        'pets',
        'img',
      ],
      include: [{ model: Order, attributes: ['done', 'price'] }],
    });
    res.json(getCleaner);
  } catch (error) {
    console.log(error);
  }
};

module.exports.cleanerPhoto = async (req, res) => {
  try {
    const img = req.file.filename;
    const id = req.params.id;

    const updatePhoto = await Cleaner.update(
      { img },
      {
        where: {
          id,
        },
      }
    );
    const result = {
      name: req.file.filename,
      status: 'done',
      url: 'test',
      thumbUrl: 'test',
    };
    res.status(200).json(result);
    // console.log(updateUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
