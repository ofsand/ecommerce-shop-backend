const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    customer_id: Number,
    product_id: Number,
    rating: Number,
    created_on: Date, 
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})


exports.Review = mongoose.model("Review", reviewSchema);