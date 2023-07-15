const { Router } = require('express');

const userRouter = new Router();

const { edit, userListForAdmin } = require('../controllers/user.controller');

module.exports = userRouter.post('/edit', edit).get('/all', userListForAdmin);
