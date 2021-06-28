const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.get('/login', authController.login);  // auth/login
router.get('/register', authController.register);  // auth/register
router.get('/', authController.auth);
module.exports = router;