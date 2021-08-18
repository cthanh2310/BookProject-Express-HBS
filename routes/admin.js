const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
var upload = require('../utils/multer');

router.get('/login', adminController.login);

router.get('/dashboard', adminController.dashboard);
// book
router.get('/book-manage', adminController.bookManage);

router.post('/book-manage',upload.single('myfile'), adminController.addBook);

router.post('/book-manage/store', adminController.bookManage_post);  // Store database to use Ajax

router.put('/book-manage/update', upload.single('myfile'), adminController.updateBook); // Update

router.delete('/book-manage/delete/:id', adminController.deleteBook);

router.get('/bill-manage', adminController.billManage);

router.get('/bill-manage/get-data', adminController.getData);

router.put('/bill-manage', adminController.updateOrderStatus);

router.get('/profile', adminController.profile);


module.exports = router;