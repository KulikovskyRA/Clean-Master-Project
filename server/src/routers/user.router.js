const { Router } = require('express');

const userRouter = new Router();

const {
  edit
} = require('../controllers/user.controller');

module.exports = userRouter
  .post('/edit', edit);
