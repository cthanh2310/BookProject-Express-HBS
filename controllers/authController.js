const users = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class authController {
    async login(req, res, next) {

        res.render('login', { layout: 'auth' });
    }
    async register_post(req, res, next) {
        try {
            const user = await users.create(req.body);
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
            res.status(200).json({
                status: 'success',
                data: { token, email: user.email }
            })

        } catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        res.render('register', { layout: 'auth' });
    }

}

module.exports = new authController();