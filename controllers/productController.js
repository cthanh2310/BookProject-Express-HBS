const books = require('../models/book');


class productController{
    async product(req, res, next){
        const bookId = req.params.id;
        const book = await books.findOne({_id: bookId})
            .then(book =>{
                book = book.toObject();
                console.log(book);
                return book;
            })
            .catch(err =>{
                next(err);
            })
        res.render('product',{book:book});
    }
}

module.exports = new productController();