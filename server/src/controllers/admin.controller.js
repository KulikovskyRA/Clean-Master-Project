const bcrypt = require('bcrypt');

const { Admin } = require('../../db/models');

module.exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await Admin.findOne({ where: { email }, raw: true });
    if (check) {
      const hashPass = await bcrypt.compare(password, check.password);

      if (hashPass) {
        req.session.admin = check;
        res.status(200).json({
          id: check.id,
          email: check.email,
          adminName: check.adminName,
          auth: true,
        });
      } else {
      }
    }
  } catch (error) {}
};

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const check = await User.findOne({ where: { username }, raw: true });
//     if (check) {
//       const hashPass = await bcrypt.compare(password, check.password);

//       if (hashPass) {
//         req.session.user = check;

//         res
//           .status(200)
//           .json({ id: check.id, username: check.username, auth: true });
//       } else {
//         res.sendStatus(403);
//       }
//     } else {
//       res.sendStatus(403);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ error: 'Ошибка авторизации.' });
//   }
// });
