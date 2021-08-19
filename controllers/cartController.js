const users = require('../models/user');
const jwt = require('jsonwebtoken');
const carts = require('../models/cart');
const books = require('../models/book');
const orders = require('../models/order');
const nodeMailer = require('../utils/nodeMailer');


class cartController {
    async cart(req, res, next) {
        try {
            const token = req.cookies['token'];
            if (token) {

                const { userId } = await jwt.verify(token, process.env.SECRET_KEY);
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
            } else {
                res.render('cart');
            }
        } catch (err) {
            return next(err);
        }
    }
    // async cart_post(req, res, next) {
    //     // console.log(req.body);
    //     res.json('ok');
    // }
    async deleteProduct(req, res, next) {
        try {
            const token = req.cookies['token'];
            if (token) {
                const { userId } = await jwt.verify(token, process.env.SECRET_KEY);
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
            }

        } catch (err) {
            return next(err);
        }
    }
    async addCartToOrder(req, res, next) {
        try {
            const token = req.cookies['token'];
            const { userId } = await jwt.verify(token, process.env.SECRET_KEY);

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
            console.log(user.email);
            const to = user.email;
            const subject = `
                    Cảm ơn bạn đã mua hàng tại thanhsimp_
                 `
            const htmlContent = ` <h3>
                        Cảm ơn ${req.body.customerName} đã mua hàng tại thanhsimp_,
                        Chúc bạn ngày mới tốt lành!  </h3>
                    `
            await nodeMailer.sendMail(to, subject, htmlContent)
                .then(()=>{
                    res.status(200).send(htmlContent)
                })
                .catch(err => {
                    return next(err);
                })
            const orderSuccess = await orders.create(order);
            await carts.updateOne({ _id: req.body.cartId }, { $set: { books: [] } });
            return res.status(200).json({
                status: 'Xuất đơn hàng thành công, mời bạn kiếm tra đơn hàng!',
                data: orderSuccess,
            })
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = new cartController();



