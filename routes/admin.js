const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const multer = require('multer');
const upload = multer({ dest:'./public/uploads/'});


router.get('/login', adminController.login);

router.get('/dashboard', adminController.dashboard);
// book
router.get('/book-manage', adminController.bookManage);

router.post('/book-manage',upload.single('image'), adminController.addBook);

router.post('/book-manage/store', adminController.bookManage_post);  // Store database to use Ajax




router.get('/bill-manage', adminController.billManage);

router.get('/profile', adminController.profile);


module.exports = router;