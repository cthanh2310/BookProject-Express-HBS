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
userSchema.pre('save', async (next)=>{
    let user = this;
    console.log('user: ' + user);
    bcrypt.hash(user.password, 10 , (error, hashedPassword) =>{
        if(error){
            return next(error);
        } else{
            user.password = hashedPassword;
            next();
        }
    })
})

const users = mongoose.model('users', userSchema);

module.exports = users;