const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const {authMiddleware} = require('../middlewares/authMiddleware.js')

router.delete('/',authMiddleware, orderController.order_delete);

router.get('/',authMiddleware, orderController.order);


module.exports = router;