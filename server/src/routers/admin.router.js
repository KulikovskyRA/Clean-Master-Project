const { Router } = require('express');

const express = require('express');

const adminRouter = express.Router();

const { adminLogin } = require('../controllers/admin.controller');

module.exports = adminRouter.post('/login', adminLogin);
