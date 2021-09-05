const users = require('../models/user');
const jwt = require('jsonwebtoken');
const orders = require('../models/order');

class orderController {
    async order(req, res, next) {
        const { userId } = req.user;   // Destructuring ES6
        const user = await users.findOne({ _id: userId })
            .then(user => {
                return user.toObject();
            })
            .catch((err) => {
                return next(err);
            })



        const listOrder = await orders.find({ customerAccount: userId, $or: [{ status: 'pending' }] }).populate('listProduct.productId', ['name', 'price', 'image']).lean();
        return res.render('order', { user, listOrder });
    }
    async order_cancel(req, res, next) {
        console.log('orderId: ', req.body.orderId);
        await orders.updateOne({ _id: req.body.orderId }, { status: 'canceled' })
            .then(() => {
                res.status(200).json({
                    status: 'success',
                })
            })
            .catch(err => {
                return next(err);
            })
    }
    async getListOrder(req, res, next) {
        const { userId } = req.user;   // Destructuring ES6
        const listOrder = await orders.find({ customerAccount: userId }).populate('listProduct.productId', ['name', 'price', 'image']).lean();
        return res.status(200).json(listOrder);
    }
}

module.exports = new orderController();