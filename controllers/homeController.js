const books = require('../models/book');

class homeController {
    async home(req, res, next) {
        const listBook = await books.find({})
            .then(listBook =>{
                listBook = listBook.map(book => book.toObject());
                return listBook;
            })
        res.render('home',{listBook});
    }
    // cart(req, res, next) {
    //     res.render('cart', { layout: "auth"});
    // }
}
module.exports = new homeController();