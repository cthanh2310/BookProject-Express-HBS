const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController.js');

const {authMiddleware} = require('../middlewares/authMiddleware.js');

router.get('/',authMiddleware, cartController.cart);
router.post('/', authMiddleware, cartController.addCartToOrder);
router.delete('/:id', authMiddleware, cartController.deleteProduct);
// router.post('/',authMiddleware, cartController.cart_post);
module.exports = router;