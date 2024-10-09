const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema =  new Schema({
    review:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    productID:{
        type: String,
        required: true
    }

})
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;