const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

module.exports.login = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports.logout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('Cookie');
      res.json({ status: 'ok' });
    });
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports.register = async (req, res) => {
  const { userName, email, prefix, phone, password } = req.body;
  const phoneNumber = `+${prefix}${phone}`;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {

    const response = await User.create({
      userName,
      email,
      prefix,
      phoneNumber,
      password: hashedPassword,
      isVerified: false
    });
    const result = response.get({ plain: true });
    console.log('RESULT', result);
    const userSessionData = {
      id: result.id,
      userName: result.userName
    };
    req.session.user = userSessionData;
    res
      .status(200)
      .json({ user: userSessionData })
      .end();
  } catch (error) {
    console.log('ERROR====>', error);
    res
      .status(400)
      .json({ error: 'Пользователь с таким email существует!' });
  }

};
