const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.get('/login', adminController.login);

module.exports = router;