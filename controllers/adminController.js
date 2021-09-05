const books = require('../models/book');
const cloudinary = require('../utils/cloudinary.js');
const orders = require('../models/order');
const bcrypt = require('bcrypt');
const users = require('../models/user');
const reviews = require('../models/review');
const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const upload = multer({ dest:'./public/uploads/'});


class adminController {
    async login(req, res, next) {
        const token = req.cookies['token'];
        if (token) {
            await jwt.verify(token, process.env.SECRET_KEY, async (err, userIdVerify) => {
                if (err) return res.status(401).json({
                    message: 'Admin không tồn tại!'
                });
                let { userId } = userIdVerify;
                let user = await users.findOne({ _id: userId });
                if (user.role == 'admin') return res.redirect('/admin/dashboard');

            })
        } else {
            return res.render('admin-login', { layout: 'admin-login' });
        }
    }
    async login_post(req, res, next) {
        let admin = await users.findOne({ email: req.body.email });
        if (!admin) {
            const err = new Error('Email không chính xác');
            err.statusCode = 400;
            err.type = 'notEmailFound'
            return next(err);

        }
        if (admin.role != 'admin') {
            const err = new Error('Nhập chính xác tài khoản admin!');
            err.statusCode = 400;
            err.type = 'notAdminAccount'
            return next(err);
        }
        if (bcrypt.compareSync(req.body.password, admin.password)) {
            let token = jwt.sign({ userId: admin._id }, process.env.SECRET_KEY);
            res.cookie('token', token, {
                maxAge: 86400 * 1000, // 24 hours
            });
            return res.status(200).json({
                message: 'Thành công!'
            })
        } else {
            const err = new Error('Mật khẩu không chính xác!');
            err.status = 400;
            err.type = 'wrongPassword'
            return next(err);
        }
    }



    async dashboard(req, res, next) {
        var d = new Date(Date.now());
        console.log(d.toISOString())
        const monthlyIncome = await orders.aggregate([
            {
                $match: {
                    status: 'delivered',
                }
            },
            {
                $group: {
                    _id: null,
                    earnings: {
                        $sum: '$totalPrice'
                    },

                    count: { $sum: 1 }
                }
            }

        ])
        const monthlyReview = await reviews.aggregate([
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ])

        console.log('review: ' + monthlyReview[0].count)
        console.log('earning: ' + monthlyIncome[0].earnings)
        console.log('sales: ' + monthlyIncome[0].count)


        res.render('dashboard', { layout: 'admin', reviewNumber: monthlyReview[0].count, earning: monthlyIncome[0].earnings, count: monthlyIncome[0].count });
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
            // upload image to cloudinary here
            const cloudinaryImage = await cloudinary.uploader.upload(req.file.path);
            req.body.image = cloudinaryImage.secure_url;
            req.body.cloudinary_id = cloudinaryImage.public_id;
            const book = await books.create(req.body);
            return res.status(200).json({
                status: 'Thêm sách thành công!',
                data: { book }
            })
        } catch (err) {
            next(err);
        }
    }
    async updateBook(req, res, next) {
        try {
            if (req.file) {
                const cloudinaryImage = await cloudinary.uploader.upload(req.file.path);
                req.body.image = cloudinaryImage.secure_url;
                req.body.cloudinary_id = cloudinaryImage.public_id;
            }
            const bookID = req.body.id;
            const book = await books.updateOne({ _id: bookID }, { ...req.body }, { new: true, runValidators: true });
            res.status(200).json({
                status: 'Cập nhật thành công!',
                data: { book },
            })
        } catch (err) {
            next(err);
        }
    }
    async deleteBook(req, res, next) {
        try {
            var dataId = req.params.id;
            await books.deleteOne({ _id: dataId });
            res.redirect('back');
        } catch (err) {
            next(err);
        }
    }
    async billManage(req, res, next) {
        const listOrder = await orders.find({}).populate('listProduct.productId', ['name', 'price']).lean();
        res.render('bill-manage', { layout: 'admin', listOrder });
    }
    async getData(req, res, next) {
        const listOrder = await orders.find({}).populate('listProduct.productId', ['name', 'price']).lean();
        return res.json(listOrder);
    }
    async updateOrderStatus(req, res, next) {
        var listOrderIdAndStatus = req.body;
        listOrderIdAndStatus.forEach(async OrderIdAndStatus => {
            await orders.findOneAndUpdate({ _id: OrderIdAndStatus.orderId }, { status: OrderIdAndStatus.status });
        })
        res.status(200).json({
            status: 'Update thành công!',
        })
    }

    profile(req, res, next) {
        res.render('admin-profile', { layout: 'admin' });
    }
}

module.exports = new adminController();