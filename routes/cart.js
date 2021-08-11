const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController.js');

const {authMiddleware} = require('../middlewares/authMiddleware.js');

router.get('/',authMiddleware, cartController.cart);

module.exports = router;