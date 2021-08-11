const books = require('../models/book');
const users = require('../models/user');
const jwt = require('jsonwebtoken');

class homeController {
    async home(req, res, next) {
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
            res.render('home', { listBook, user });
            await console.log(user);
        }
        else {
            res.render('home', { listBook });
        }

    }
    // cart(req, res, next) {
    //     res.render('cart', { layout: "auth"});
    // }
}
module.exports = new homeController();