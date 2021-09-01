const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const upload = require('../utils/multer');
const {adminMiddleware} = require('../middlewares/adminMiddleware');

router.get('/login', adminController.login);

router.post('/login', adminController.login_post);


router.get('/dashboard',adminMiddleware, adminController.dashboard);
// book
router.get('/book-manage',adminMiddleware, adminController.bookManage);

router.post('/book-manage',adminMiddleware, upload.single('myfile'), adminController.addBook);

router.post('/book-manage/store',adminMiddleware, adminController.bookManage_post);  // Store database to use Ajax

router.put('/book-manage/update',adminMiddleware, upload.single('myfile'), adminController.updateBook); // Update

router.delete('/book-manage/delete/:id',adminMiddleware, adminController.deleteBook);

router.get('/bill-manage',adminMiddleware, adminController.billManage);

router.get('/bill-manage/get-data',adminMiddleware, adminController.getData);

router.put('/bill-manage',adminMiddleware, adminController.updateOrderStatus);

router.get('/profile',adminMiddleware, adminController.profile);


module.exports = router;