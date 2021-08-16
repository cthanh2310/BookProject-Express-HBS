const users = require('../models/user');
const jwt = require('jsonwebtoken');
const orders = require('../models/order');

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



            const listOrder = await orders.find({customerAccount: userId}).populate('listProduct.productId', ['name', 'price', 'image']).lean();
            res.render('order', { user, listOrder });
        }
        else {
            res.render('order');
        }
    }
}

module.exports = new orderController();