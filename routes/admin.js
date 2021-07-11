const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const multer = require('multer');
const upload = multer({ dest:'./public/uploads/'});
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, __dirname + "/public")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// var upload = multer({ storage: storage }).array('myfile', 4);  // maxcount = 4

// upload(req, res, next, function (err) {
//     if (err instanceof multer.MulterError) {
//         // A Multer error occurred when uploading.
//         res.json({
//             status: "failed"
//         })
//     } else if (err) {
//         res.json({
//             status: "failed"
//         })
//         // An unknown error occurred when uploading.
//     }
//     console.log("files: ", req.files.path);
//     console.log("body: ", req.body);
//     res.send({status: 'success'});
//     // Everything went fine.
// })

router.get('/login', adminController.login);

router.get('/dashboard', adminController.dashboard);
// book
router.get('/book-manage', adminController.bookManage);

router.post('/book-manage',upload.single('myfile'), adminController.addBook);

router.post('/book-manage/store', adminController.bookManage_post);  // Store database to use Ajax




router.get('/bill-manage', adminController.billManage);

router.get('/profile', adminController.profile);


module.exports = router;