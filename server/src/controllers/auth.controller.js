const bcrypt = require('bcrypt');

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
  try {
  } catch (error) {}
};
