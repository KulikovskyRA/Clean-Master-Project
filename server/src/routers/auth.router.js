const { Router } = require('express');

const authRouter = new Router();

const {
  login,
  logout,
  register
} = require('../controllers/auth.controller');

module.exports = authRouter
  .post('/register', register)
  .post('/login', login)
  .get('/logout', logout);
