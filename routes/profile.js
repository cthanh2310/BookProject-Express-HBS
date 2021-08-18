const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');
const {authMiddleware} = require('../middlewares/authMiddleware.js');
var upload = require('../utils/multer');


router.get('/',authMiddleware, profileController.profile);

router.put('/',authMiddleware,upload.single('avatar-file'), profileController.updateProfile);

module.exports = router;