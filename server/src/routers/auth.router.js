const { Router } = require('express');

const authRouter = new Router();

const {
  login,
  logout,
  register
} = require('../controllers/auth.controller');

module.exports = authRouter
  .post('/login', login)
  .get('/logout', logout)
  .post('/register', register);
