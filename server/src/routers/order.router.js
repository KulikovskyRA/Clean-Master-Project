const { Router } = require('express');

const express = require('express');

const orderRouter = express.Router();

const {
  orders,
  deleteOrder,
  updateCleaner,
} = require('../controllers/order.controller');

module.exports = orderRouter
  .get('/', orders)
  .delete('/:id', deleteOrder)
  .put('/', updateCleaner);
