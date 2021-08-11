const users = require('../models/user');
const jwt = require('jsonwebtoken');


class orderController {
    async order(req, res, next) {
        const token = req.cookies['token'];
        if (token) {
            const { userId } = await jwt.verify(token, process.env.SECRET_KEY);
            const user = await users.findOne({ _id: userId })
                .then(user => {
                    return user.toObject();
                })
                .catch((err) => {
                    return next(err);
                })
            res.render('order', { user });
            await console.log(user);
        }
        else {
            res.render('order');
        }
    }
}

module.exports = new orderController();