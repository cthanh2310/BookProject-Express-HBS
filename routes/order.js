const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');

router.get('/', orderController.order);

module.exports = router;