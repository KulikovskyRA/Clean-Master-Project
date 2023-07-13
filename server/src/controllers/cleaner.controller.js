const bcrypt = require('bcrypt');

const { Cleaner } = require('../../db/models');

module.exports.cleanerLogin = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const check = await Cleaner.findOne({ where: { phoneNumber }, raw: true });
    if (check) {
      const hashPass = await bcrypt.compare(password, check.password);

      if (hashPass) {
        const cleaner = {
          id: check.id,
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
