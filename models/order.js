const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    listProduct: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'books',
            },
            quantity: {
                type: Number,
                require: true,
            }
        }
    ],
    status: {
        type: String,
        default: 'pending',
    },
    totalPrice: {
        type: Number,
    },
    customerName: {
        type: String,
        require: [true, 'Tên người nhận bắt buộc!'],
    },
    customerAddress: {
        type: String,
        require: [true, 'Địa chỉ người nhận bắt buộc!'],
    },
    customerPhone: {
        type: String,
        require: [true, 'Số điện thoại bắt buộc!'],
    },
    customerAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }


}, { timestamps: true })

const orders = mongoose.model('orders', orderSchema);

module.exports = orders;