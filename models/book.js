const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Tên sách đã tồn tại!'],
        trim: true,
        require: [true, 'Tên sách là bắt buộc']
    },
    dateOfSubmit: {
        type: Date,
        required: [true, 'Thời gian bắt buộc nhập! ']
    },
    price: {
        type: Number,
        required: [true,'Vui lòng nhập giá sách!']
    },
    description: {
        type: String,
        required: [true,'Vui lòng nhập mô tả!']
    },
    category: {
        type: String,
        required: [true,'Vui lòng nhập thể loại!']
    },
    author: {
        type: String,
        required: [true,'Vui lòng nhập tên tác giả!']
    },
    publisher: {
        type: String,
        required: [true,'Vui lòng nhập nhà xuất bản!']
    },
    image: {
        type: String,
        required: [true,'Vui lòng thêm hình ảnh cho sách!']
    }, 
    cloudinary_id: {
        type: String,
    },
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