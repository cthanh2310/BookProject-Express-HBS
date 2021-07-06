const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        require: [true, 'Bắt buộc nhập email']
    },
    password: {
        type: String,
        required: [true, 'Băt buộc nhập mật khẩu'],
        minlength: [6, 'Mật khẩu tối thiểu 6 ký tự']
    },
    fullname: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
    },
    dob: {
        type: Date,
    },
    avatar: {
        data: Buffer,
        contentType: String
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