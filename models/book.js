const mongoose = require('mongoose');
var moment = require('moment');

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: [true, 'Tên sách đã tồn tại!'],
        trim: true,
        require: [true, 'Tên sách là bắt buộc']
    },
    dateOfSubmit:{
        type: Date,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    publisher:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
})

// bookSchema.pre('save',async function(next){
//     var book = this;
//     const date = await book.dateOfSubmit.getDate();
//     const month = await book.dateOfSubmit.getMonth();
//     const year = await book.dateOfSubmit.getFullYear();
//     book.dateOfSubmit = await book.dateOfSubmit.toString();
//     book.dateOfSubmit = await `${date}/${month}/${year}`;
//     console.log(`${date}/${month}/${year}`);
//     console.log('Date of submit: ' + book.dateOfSubmit.toDateString());
//     next();
// })

const books = mongoose.model('books', bookSchema);

module.exports = books;