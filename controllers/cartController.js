const users = require('../models/user');
const jwt = require('jsonwebtoken');
const carts = require('../models/cart');

class cartController {
    async cart(req, res, next) {
        const token = req.cookies['token'];
        if (token) {

            const { userId } = await jwt.verify(token, process.env.SECRET_KEY);
            const cart = await carts.findOne({ user: userId }).populate('books.bookId', ['name', 'price', 'image']).lean();
            var listBookInCart = null;
            if (cart) {
                listBookInCart = await cart.books || null;
            }
            await users.findOne({ _id: userId })
                .then(user => {
                    user = user.toObject();
                    return res.render('cart', { user, listBookInCart });
                })
                .catch(err => {
                    return next(err);
                })
        } else {
            res.render('cart');
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
                var cart = await carts.findOne({ user: userId })
                    .then(cart => {
                        cart = cart.toObject()
                        return cart;
                    })
                    .catch(err => console.error(err));
                console.log('bookId: ', cart.books[0]._id);
                // for (var i = 0; i < cart.books.length; i++) {
                //     console.log(cart.books[i]._id);
                //     if (cart.books[i]._id == bookId) {
                //         console.log(cart.books[i]);
                //         delete cart.books[i];
                //     }
                // }
                // console.log(cart);
                // cart = new carts(cart);
                // cart.save()
                //     .then(function(){
                //         res.redirect('/cart')
                //     })
                //     .catch(err =>{
                //         res.status(200).send(err);
                //     })
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
}

module.exports = new cartController();



