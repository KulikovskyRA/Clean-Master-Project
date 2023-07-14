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

module.exports.cleanerRegister = async (req, res) => {
  const { name, surname, patrname, phoneNumber, nation, password, pets } =
    req.body;

  // console.log(req.body);
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

// try {
//   const isUserExist = (await User.findOne({ where: { username } })) !== null;
//   if (isUserExist) {
//     res.sendStatus(403);
//     return;
//   }
//   const isEmailExist = (await User.findOne({ where: { email } })) !== null;
//   if (isEmailExist) {
//     res.sendStatus(403);
//     return;
//   }

//   const hashPassword = await bcrypt.hash(password, 10);
//   const userData = await User.create({
//     username,
//     email,
//     password: hashPassword,
//   });

//   const user = userData.get({
//     plain: true,
//   });
//   req.session.user = user;

//   res.json({ id: user.id, username: user.username });
// } catch (error) {
//   res.sendStatus(404);
// }
// });
