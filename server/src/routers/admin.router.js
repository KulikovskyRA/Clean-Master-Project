const { Router } = require('express');

const adminRouter = new Router();

const { login, logout, register } = require('../controllers/auth.controller');

module.exports = adminRouter
  .post('/login', login)
  .get('/logout', logout)
  .post('/register', register);
