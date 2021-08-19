const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');

router.get('/', homeController.home);

router.get('/drop-data', homeController.returnBook); // user ajax to search book, search by price and search by category

module.exports = router;