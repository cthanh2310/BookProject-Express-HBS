const books = require('../models/book');
const jwt = require('jsonwebtoken');
const users = require('../models/user');
const carts = require('../models/cart');


class productController {
    async product(req, res, next) {
        try {
            const bookId = req.params.id;
            const book = await books.findOne({ _id: bookId })
                .then(book => {
                    if (book) {
                        book = book.toObject();
                        return book;
                    } else {
                        res.status(404).json({
                            message: '404 not found :(',
                        })
                    }
                })
                .catch(err => {
                    next(err);
                })
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
                res.render('product', { book, user });
            }
            else {
                res.render('product', { book });
            }
        } catch(err) {
            return next(err);
        }
    }
    async addToCart(req, res, next) {
        const bookId = req.params.id;
        const newBook = await books.findOne({ _id: bookId })
            .then(book => {
                if (book) {
                    book = book.toObject();
                    return book;
                } else return null;
            })
            .catch(err => {
                next(err);
            })
        const token = req.cookies['token'];
        const { userId } = jwt.verify(token, process.env.SECRET_KEY);
        var cart = await carts.findOne({ user: userId })
            .then(async newCart => {
                if (newCart) {
                    newCart = newCart.toObject();
                    return newCart;
                } else return null;
            })
            .catch(err => {
                return next(err);
            })
        // console.log(cart);
        if (cart && newBook) {
            var bookExist = false;
            var quantity = parseInt(req.body.quantity);
            cart.books.forEach(book => {
                if (book.bookId == bookId) {    // exist book: increase quantity
                    bookExist = true;
                    book.quantity += quantity;
                    return;
                }
            })
            if (!bookExist) {
                cart.books.push({
                    bookId: bookId,
                    quantity: quantity
                });
            }
            // console.log(req.cookies[book._id]);
            await carts.updateOne({ user: userId }, { books: cart.books });
            res.status(200).json({
                message: "Thêm vào giỏ hàng thành công!",
                data: cart,
            })
        } else if (newBook && !cart) {
            var quantity = parseInt(req.body.quantity);
            // console.log(req.cookies[book._id]);
            await carts.create({
                books: [
                    {
                        bookId: bookId,
                        quantity: quantity
                    }
                ]
                , user: userId
            });
            res.status(200).json({
                message: "Thêm vào giỏ hàng thành công!",
                data: cart,
            })
        } else if (!newBook) {
            return res.status(404).json({
                message: 'Book not found',
            })
        }

    }
}
/*
const listBook = await books.find({})
                .then(async listBook => {
                    listBook = await listBook.map(book => book.toObject());
                    return listBook;
                })
                .catch(err => {
                    return next(err);
                })
            var cart = await carts.findOne({ user: userId })
                .then(async newCart => {
                    if (newCart) {
                        newCart = newCart.toObject();
                        return newCart;
                    } else return null;
                })
                .catch(err => {
                    return next(err);
                })
            // console.log(cart);

            listBook.forEach(async book => {
                if (req.cookies[book._id] && cart) {
                    var bookId = req.cookies[book._id].split(':')[0];
                    var quantity = req.cookies[book._id].split(':')[1];
                    quantity = parseInt(quantity);
                    var newBook = { bookId: bookId, quantity: quantity };
                    var bookExist = false;
                    // console.log('books in cart: ', cart.books);
                    cart.books.forEach(book => {
                        if (book.bookId == newBook.bookId) {    // exist book: increase quantity
                            bookExist = true;
                            book.quantity += quantity;
                            return;
                        }
                    })
                    if (!bookExist) {
                        cart.books.push(newBook);
                    }
                    // console.log(req.cookies[book._id]);
                    res.clearCookie(book._id);
                    return carts.updateOne({ user: userId }, { books: cart.books });
                } else if (req.cookies[book._id] && !cart) {
                    var bookId = req.cookies[book._id].split(':')[0];
                    var quantity = req.cookies[book._id].split(':')[1];
                    var newBook = [{ bookId: bookId, quantity: quantity }];
                    // console.log(req.cookies[book._id]);
                    res.clearCookie(book._id);
                    return carts.create({ books: newBook, user: userId });
                }
            }) */



module.exports = new productController();