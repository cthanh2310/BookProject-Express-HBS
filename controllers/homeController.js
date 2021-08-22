const books = require('../models/book');
const users = require('../models/user');
const jwt = require('jsonwebtoken');

class homeController {
    async home(req, res, next) {
        try {
            const listBook = await books.find({})
                .then(listBook => {
                    listBook = listBook.map(book => book.toObject());
                    return listBook;
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
                if (user) {
                    return res.render('home', { listBook, user });
                }
                return res.render('home', { listBook });
            }
            if (req.user) {
                console.log('req.session.passport.user', req.session.passport.user);
                console.log('req.user: ', req.user)
                const token = jwt.sign({ userId: req.user._id }, process.env.SECRET_KEY);
                res.cookie('token', token, {
                    maxAge: 86400 * 1000, // 24 hours
                });
                console.log('google');
                await users.findOne({ _id: req.user._id }).lean()
                    .then(user => {
                        return res.render('home', { listBook, user });
                    })
                    .catch(err => {
                        return next(err);
                    })
            }
            return res.render('home', { listBook });
        } catch (err) {
            return next(err);
        }

    }
    async returnBook(req, res, next) {
        await books.find({})
            .then((listBook) => {
                listBook.map(book => book.toObject());
                return res.json({
                    data: listBook,
                });
            })
            .catch((err) => {
                return next(err);
            })
    }
    // cart(req, res, next) {
    //     res.render('cart', { layout: "auth"});
    // }
}
module.exports = new homeController();