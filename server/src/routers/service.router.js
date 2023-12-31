const express = require('express');

const serviceRouter = express.Router();

const {
  servicesAll,
  serviceEdit,
  singlePriceServices,
  noSinglePriceServices,
  serviceDelete,
  serviceNew,
} = require('../controllers/service.controller');

module.exports = serviceRouter
  .get('/all', servicesAll)
  .get('/singleprice', singlePriceServices)
  .get('/nosingleprice', noSinglePriceServices)
  .put('/:id', serviceEdit)
  .delete('/:id', serviceDelete)
  .post('/new', serviceNew);
