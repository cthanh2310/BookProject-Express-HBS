const jwt = require('jsonwebtoken');
const users = require('../models/user');
async function adminMiddleware(req, res, next) {
    const token = req.cookies['token'];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(401).json({
                message: 'Không tìm thấy người dùng!'
            })
            req.user = user;
            console.log(user)
            next();
        });

    } else {
        res.redirect('/admin/login');
    }
}

module.exports = { adminMiddleware }