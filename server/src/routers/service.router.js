const { Router } = require('express');

const express = require('express');

const serviceRouter = express.Router();

const {
  servicesAll,
  serviceEdit,
} = require('../controllers/service.controller');

module.exports = serviceRouter
  .get('/all', servicesAll)
  .put('/:id', serviceEdit);
