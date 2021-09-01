const jwt = require('jsonwebtoken');
const users = require('../models/user');
async function adminMiddleware(req, res, next) {
    const token = req.cookies['token'];
    if (token) {
        const {userId} = jwt.verify(token, process.env.SECRET_KEY);
        await users.findOne({_id: userId})
            .then(user => {
                if(user.role == 'admin') return next();
                res.redirect('/admin/login');
            })
            .catch(err => {
                res.redirect('/admin/login')
            })
    } else {
        res.redirect('/admin/login');
    }
}

module.exports = { adminMiddleware }