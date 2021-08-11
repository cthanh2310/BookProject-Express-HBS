const users = require('../models/user');
const jwt = require('jsonwebtoken');


class cartController{
    async cart(req, res, next){
        
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
            res.render('cart', {user });
            await console.log(user);
        }
        else {
            res.render('cart');
        }
    }
}

module.exports = new cartController();