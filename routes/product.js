const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

router.get('/:id', productController.product);
router.post('/:id', productController.addToCart);

module.exports = router;