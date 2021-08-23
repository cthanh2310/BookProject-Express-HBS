const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const passport = require('passport');

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);
router.get('/google/callback', passport.authenticate('google',{ failureRedirect: '/auth/login', successRedirect: '/'}));

router.post('/login', authController.login_post);

router.get('/login', authController.login);  // auth/login

router.get('/logout', authController.logout);  // auth/logout


router.post('/register', authController.register_post);

router.get('/register', authController.register);  // auth/register

module.exports = router;