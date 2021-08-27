const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Cần có user!'],
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
    },
    content: {
        type: String,
        trim: true,
    },
    likes: [
        {                            //who like this comment
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
    ],
    dislikes: [
        {                            //who dislike this comment
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
}, { timestamps: true })

const reviews = mongoose.model('reviews', reviewSchema);

module.exports = reviews;

