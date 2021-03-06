const users = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class authController {
    async login(req, res, next) {
        const token = req.cookies['token'];
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) return res.status(401).json({
                    message: 'Không tìm thấy người dùng'
                })
                res.redirect('/');
            });
        } else {
            res.render('login', { layout: 'auth' });
        }
    }
    async login_post(req, res, next) {
        let user = await users.findOne({ email: req.body.email });
        if (!user) {
            const err = new Error('Email bạn nhập không chính xác!');
            err.statusCode = 400;
            return next(err);
        }
        if (!user.password) {
            const err = new Error('Dùng phương thức đăng nhập khác!')
            err.statusCode = 400;
            return next(err);
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
            res.cookie('token', token, {
                maxAge: 86400 * 1000, // 24 hours
            });
            return res.status(200).json({
                status: 'Thành công!',
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
    async logout(req, res, next) {
        req.session.destroy(function (e) {
            req.logout();
            res.redirect('/');
        });
    }

    async register_post(req, res, next) {
        try {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!req.body.email.match(regexEmail)) {
                const err = new Error('Nhập đúng định dạng email!');
                err.statusCode = 400;
                err.type = 'emailNotMatch'
                return next(err);
            }
            let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
            if (!req.body.password.match(regexPassword)) {
                const err = new Error('Mật khẩu ít nhất 8 ký tự, bao gồm số, kí tự hoa và thường!');
                err.statusCode = 400;
                err.type = 'passwordNotMatch'
                return next(err);
            }
            if (req.body.password == req.body.confirmPassword) {
                const user = await users.create({
                    email: req.body.email,
                    password: req.body.password,
                })
                const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
                res.status(200).json({
                    status: 'Đăng ký thành công!',
                    data: { token, email: user.email }
                })
            } else {
                const err = new Error('Nhập mật khẩu không trùng khớp');
                err.statusCode = 400;
                err.type = 'twoPasswordNotMatch'
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