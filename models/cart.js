const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    books: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'books',
            },
            quantity: Number,
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Cần có user!'],
    },
} ,{timestamps : true})

const carts = mongoose.model('carts', cartSchema);

module.exports = carts;