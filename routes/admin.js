const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.get('/login', adminController.login);
router.get('/dashboard', adminController.dashboard);
router.get('/book-manage', adminController.bookManage);
router.get('/bill-manage', adminController.billManage);
router.get('/profile', adminController.profile);


module.exports = router;