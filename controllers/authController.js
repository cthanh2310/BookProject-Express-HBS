const users = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class authController {
    async login(req, res, next) {

        res.render('login', { layout: 'auth' });
    }
    async login_post(req, res, next) {
        let user = await users.findOne({ email: req.body.email });
        if (!user) {
            const err = new Error('Email bạn nhập không chính xác!');
            err.statusCode = 400;
            return next(err);
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
            res.status(200).json({
                status: 'success',
                data: {
                    token: token,
                    email: user.email
                },
            })
        } else {
            const err = new Error('Mật khẩu nhập không chính xác');
            err.statusCode = 400;
            return next(err);
        }
    }
    async register_post(req, res, next) {
        try {
            if(req.body.password == req.body.confirmPassword){
                const user = await users.create({
                    email: req.body.email,
                    password: req.body.password
                })
                const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
                res.status(200).json({
                    status: 'success',
                    data: { token, email: user.email }
                })
            } else {
                const err = new Error('Nhập mật khẩu không trùng khớp');
                err.statusCode = 400;
                return next(err);
            }

        } catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        res.render('register', { layout: 'auth' });
    }

}

module.exports = new authController();