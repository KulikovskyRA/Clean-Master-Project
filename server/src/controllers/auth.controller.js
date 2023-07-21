const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ where: { email }, raw: true });
    if (!userData) {
      return res.status(403).json({ error: 'Неправильный логин или пароль' });
    }
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      res.status(400).json({ error: 'Неправильный логин или пароль' });
    } else {
      const sessionUser = {
        email,
        name: userData.userName,
        id: userData.id,
        phoneNumber: userData.phoneNumber,
      };

      req.session.user = sessionUser;
      console.log('REQSESSSSION', req.session.user);
      res.status(200).json({ user: sessionUser });
      // console.log(req.session);
    }
  } catch (err) {
    console.log('Ошибка login --->', err);
    res.status(400).json({ error: 'error' });
  }
};

module.exports.logout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('CleanMasterCookie');
      res.json({ status: 'ok' });
    });
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports.register = async (req, res) => {
  try {
    const { userName, email, prefix, phone, password } = req.body;
    const phoneNumber = `+${prefix}${phone}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await User.create({
      userName,
      email,
      prefix,
      phoneNumber,
      password: hashedPassword,
      isVerified: false,
    });

    const userSessionData = {
      id: response.id,
      userName: response.userName,
      email: response.email,
      phone: response.phoneNumber,
    };
    console.log(userSessionData);
    res.status(200).json({ user: userSessionData });
  } catch (error) {
    console.log('ERROR====>', error);
    res.status(400).json({ error: 'Пользователь с таким email существует!' });
  }
};

// Проверка авторизованности по сессиям
module.exports.checkSessions = async (req, res) => {
  try {
    // console.log(req.session);
    res.json({
      user: req.session.user,
      admin: req.session.admin,
      cleaner: req.session.cleaner,
    });
  } catch (err) {
    console.log(err);
  }
};
