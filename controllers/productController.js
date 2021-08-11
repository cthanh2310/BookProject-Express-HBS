const books = require('../models/book');
const jwt = require('jsonwebtoken');
const users = require('../models/user');

class productController {
    async product(req, res, next) {
        const bookId = req.params.id;
        const book = await books.findOne({ _id: bookId })
            .then(book => {
                book = book.toObject();
                console.log(book);
                return book;
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
            await console.log(user);
        }
        else {
            res.render('product', { book });
        }
    }
}

module.exports = new productController();