const users = require('../models/user');
const jwt = require('jsonwebtoken');
const carts = require('../models/cart');
const books = require('../models/book');
const orders = require('../models/order');
const nodeMailer = require('../utils/nodeMailer');


class cartController {
    async cart(req, res, next) {
        try {
            const { userId } = req.user;
            const cart = await carts.findOne({ user: userId }).populate('books.bookId', ['name', 'price', 'image']).lean();
            console.log(cart);
            var listBookInCart = null;
            var cartId = null;
            if (cart) {
                listBookInCart = await cart.books || null;
                cartId = await cart._id || null;
            }
            await users.findOne({ _id: userId })
                .then(user => {
                    user = user.toObject();
                    return res.render('cart', { user, listBookInCart, cartId });
                })
                .catch(err => {
                    return next(err);
                })
        } catch(err) {
        return next(err);
    }
}
    // async cart_post(req, res, next) {
    //     // console.log(req.body);
    //     res.json('ok');
    // }
    async deleteProduct(req, res, next) {
    try {
            const { userId } = req.user;   // destructuring ES6
            var bookIdAdded = req.params.id;
            await carts.updateOne(
                { user: userId },
                {
                    $pull: {
                        books: {
                            _id: bookIdAdded,
                        }
                    }
                },
            );
            res.redirect('/cart');

    } catch (err) {
        return next(err);
    }
}
    async addCartToOrder(req, res, next) {
    try {
        const { userId } = req.user;

        var order = {
            listProduct: req.body.listBook,
            totalPrice: req.body.totalPrice,
            customerName: req.body.customerName,
            customerAddress: req.body.customerAddress,
            customerPhone: req.body.customerPhone,
            customerAccount: userId,
        }
        const user = await users.findOne({ _id: userId })
            .then(user => user.toObject())
            .catch(err => {
                return next(err);
            })
        const to = user.email;
        const subject = `
                    C???m ??n b???n ???? mua h??ng t???i thanhsimp_
                 `
        const htmlContent = ` <h3>
                        C???m ??n ${req.body.customerName} ???? mua h??ng t???i thanhsimp_,
                        Ch??c b???n ng??y m???i t???t l??nh!  </h3>
                    `
        await nodeMailer.sendMail(to, subject, htmlContent)
            .then(() => {
                res.status(200).send(htmlContent)
            })
            .catch(err => {
                return next(err);
            })
        await orders.create(order);
        await carts.updateOne({ _id: req.body.cartId }, { $set: { books: [] } });
    }
    catch (err) {
        next(err);
    }
}
}

module.exports = new cartController();



