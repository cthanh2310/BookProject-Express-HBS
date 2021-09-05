var jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies['token'];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
            if(err) return res.status(403).json({
                message: 'Không tìm thấy người dùng!',
            })
            req.user = user;
            next()
        });
       
    } else {
        res.redirect('back');
    }
}

module.exports = { authMiddleware }