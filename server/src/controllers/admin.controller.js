const bcrypt = require('bcrypt');

const { Admin } = require('../../db/models');

module.exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // //!Cначала очищаем сессию чтобы не путались авторизации юзера, админа и клинера
  // req.session.destroy(() => {
  //   res.clearCookie('CleanMasterCookie');
  // });

  try {
    const check = await Admin.findOne({ where: { email }, raw: true });
    if (check) {
      const hashPass = await bcrypt.compare(password, check.password);

      if (hashPass) {
        const admin = {
          id: check.id,
          email: check.email,
          adminName: check.adminName,
        };
        req.session.admin = admin;
        res.status(200).json({
          id: check.id,
          email: check.email,
          adminName: check.adminName,
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
