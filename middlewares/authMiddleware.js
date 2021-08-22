var jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies['token'];
    if (token) {
        const userId = jwt.verify(token, process.env.SECRET_KEY);
        if(userId) {
            next();
        }
    } else {
        res.redirect('back');
    }
}

module.exports = { authMiddleware }