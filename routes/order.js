const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const {authMiddleware} = require('../middlewares/authMiddleware.js')

router.put('/',authMiddleware, orderController.order_cancel);

router.get('/get-data', authMiddleware, orderController.getListOrder);

router.get('/',authMiddleware, orderController.order);


module.exports = router;