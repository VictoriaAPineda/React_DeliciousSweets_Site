const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    ccn:{
        type: String,
        required: true
    },
    pickupTime:{
        type: String,
    },
    delivery:{
        type: String,
    },
    cart:{
        productID:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    totalCost:{
        type: Number,
        required: true
    }

})
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;