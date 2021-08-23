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



            const listOrder = await orders.find({ customerAccount: userId, $or: [{ status: 'pending' }] }).populate('listProduct.productId', ['name', 'price', 'image']).lean();
            return res.render('order', { user, listOrder });
        }
        res.render('order');
    }
    async order_delete(req, res, next) {
        console.log(req.body.orderId);
        await orders.deleteOne({_id: req.body.orderId})
            .then(()=>{
                res.status(200).json({
                    status: 'success',
                })
            })
            .catch(err=>{
                return next(err);
            })
    }
}

module.exports = new orderController();