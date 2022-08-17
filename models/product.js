const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { 
        type: String,
        required :false
    },
    description: { 
        type: String,
        required :false
    },
    richDescription: { 
        type: String,
        default: ''
    },
    image: { 
        type: String,
        default: ''
    },
    images: [{ 
        type: String,
        default: []
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    countInStock: {
        type: Number,
        required: false,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }

})

//changing _id to id (removing the underscore) Using Virtuals
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true
});

exports.Product = mongoose.model('Product', productSchema);
