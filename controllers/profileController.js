const users = require('../models/user');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
class profileController {
    async profile(req, res, next) {
        try {
            const token = req.cookies['token'];
            if (token) {
                const { userId } = jwt.verify(token, process.env.SECRET_KEY);
                await users.findOne({ _id: userId })
                    .then(async user => {
                        user = await user.toObject();
                        return res.render('profile', { user: user })
                    })
                    .catch(err => {
                        return next(err);
                    })

            } else res.render('profile');
        } catch (err) {
            return next(err);
        }
    }
    async updateProfile(req, res, next) {
        try {
            if (req.file) {
                const cloudinaryImage = await cloudinary.uploader.upload(req.file.path);
                req.body.avatar = cloudinaryImage.secure_url;
                req.body.cloudinary_id = cloudinaryImage.public_id;
            }
            await users.updateOne({ _id: req.body.userId }, {...req.body}, { new: true, runValidators: true });
            res.json('success');
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new profileController();