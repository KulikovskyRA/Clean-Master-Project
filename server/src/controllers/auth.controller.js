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
      // console.log('Залогинелся---->', userData);
      // console.log(req.session);
      res.status(200).json({ user: sessionUser });
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
      isVerified: false,
    });
    const result = response.get({ plain: true });
    console.log('RESULT', result);
    const userSessionData = {
      id: result.id,
      userName: result.userName,
      email: result.email,
      phone: result.phoneNumber,
    };
    req.session.user = userSessionData;
    res.status(200).json({ user: userSessionData }).end();
  } catch (error) {
    console.log('ERROR====>', error);
    res.status(400).json({ error: 'Пользователь с таким email существует!' });
    res.end();
  }
};

// Проверка авторизованности по сессиям
module.exports.checkSessions = async (req, res) => {
  // console.log('REQSESSIONUSER', req.session);
  res.json({
    user: req.session.user,
    admin: req.session.admin,
    cleaner: req.session.cleaner,
  });

  // if (req.session.user) {
  //   res.json({
  //     type: 'user',
  //     id: req.session.user.id,
  //     name: req.session.user.userName,
  //     email: req.session.user.email,
  //     phoneNumber: req.session.user.phoneNumber,
  //   });
  // } else if (req.session.admin) {
  //   res.json({
  //     type: 'admin',
  //     id: req.session.admin.id,
  //     name: req.session.admin.adminName,
  //     email: req.session.admin.email,
  //     phoneNumber: req.session.admin.phoneNumber,
  //   });
  // } else if (req.session.cleaner) {
  //   res.json({
  //     type: 'cleaner',
  //     id: req.session.cleaner.id,
  //     name: req.session.cleaner.name,
  //     email: req.session.cleaner.email,
  //     phoneNumber: req.session.cleaner.phoneNumber,
  //   });
  // } else {
  //   res.json({ status: 405 });
  // }
};
