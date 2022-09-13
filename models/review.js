const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    rating: Number,
    reviewer: String,
    created_on: Date, 
    text: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

//changing _id to id (removing the underscore) Using Virtuals
reviewSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

reviewSchema.set('toJSON', {
    virtuals: true
});

exports.Review = mongoose.model("Review", reviewSchema);