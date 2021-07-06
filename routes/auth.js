const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.get('/login', authController.login);  // auth/login

router.post('/register', authController.register_post);

router.get('/register', authController.register);  // auth/register

module.exports = router; 