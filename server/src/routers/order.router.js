const { Router } = require('express');

const express = require('express');

const orderRouter = express.Router();

const {
  orders,
  deleteOrder,
  updateCleaner,
  adminTab2Info,
  updatePrice,
} = require('../controllers/order.controller');

module.exports = orderRouter
  .get('/', orders)
  .delete('/:id', deleteOrder)
  .put('/', updateCleaner)
  .patch('/', updatePrice)
  .get('/tab2', adminTab2Info);
