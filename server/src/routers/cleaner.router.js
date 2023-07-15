const { Router } = require('express');

const express = require('express');

const cleanerRouter = express.Router();

const {
  cleanerLogin,
  cleanerRegister,
  cleanersList,
} = require('../controllers/cleaner.controller');

module.exports = cleanerRouter
  .post('/login', cleanerLogin)
  .post('/register', cleanerRegister)
  .get('/', cleanersList);
