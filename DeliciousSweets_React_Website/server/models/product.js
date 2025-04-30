const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    specification:{
        type: String,
        required: true
    }
});
// Mongoose will looks for 'products' table
const Product = mongoose.model('Product', productSchema);
module.exports = Product;