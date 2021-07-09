const books = require('../models/book');
var moment = require('moment');

class adminController {
    login(req, res, next) {
        res.render('admin-login', { layout: 'admin-login' });
    }

    dashboard(req, res, next) {
        res.render('dashboard', { layout: 'admin' });
    }
    // book
    async bookManage(req, res, next) {
        try {
            var listBook = await books.find({}).sort([['_id', -1]])
                .then(listBook => {
                    listBook = listBook.map(book => book.toObject());
                    return listBook;
                })
            res.render('book-manage', { listBook, layout: 'admin' });
        } catch (err) {
            next(err);
        }

    }
    async bookManage_post(req, res, next) {
        try {
            await books.find({}).sort([['_id', -1]])
                .then(async listBook => {
                    listBook = await listBook.map(book => book.toObject());
                    return res.json(listBook);
                })
        } catch (err) {
            next(err);
        }
    }


    async addBook(req, res, next) { // admin/book-manage : post
        try {
            req.body.image = req.file.path.split('\\').slice(1).join('\\');
            const book = await books.create(req.body);
            return res.status(200).json({
                status: 'Thành công!',
                data: { book }
            })
        } catch (err) {
            next(err);
        }
    }
    async updateBook(req, res, next) {
        try {
            const { bookID } = req.params;
            await books.findByIdAndUpdate(bookID, { ...req.body }, { new: true, runValidators: true });
            res.status(200).json({
                status: 'Thành công!',
            })
        } catch (err) {
            next(err);
        }
    }

    billManage(req, res, next) {
        res.render('bill-manage', { layout: 'admin' });
    }

    profile(req, res, next) {
        res.render('admin-profile', { layout: 'admin' });
    }
}

module.exports = new adminController();