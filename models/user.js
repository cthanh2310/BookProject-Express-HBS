const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        require: [true, 'Bắt buộc nhập email']
    },
    password: {
        type: String,
    },
    fullname: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    role: {
        type: String,

    },
    phoneNumber: {
        type: String,
        trim: true,
        match: [/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Vui lòng nhập đúng số điện thoại!']
    },
    gender: {
        type: String,
        trim: true,
    },
    dob: {
        type: String,
    },
    avatar: {
        default: 'https://res.cloudinary.com/cthanh2310/image/upload/v1629953121/nkim6gk4qtfrsepepzs5.png',
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    googleId: {
        type: String,
    }
},{
    timestamps: true,
})

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
const users = mongoose.model('users', userSchema);

module.exports = users;