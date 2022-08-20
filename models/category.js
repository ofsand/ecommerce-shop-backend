const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    }
})

//changing _id to id (removing the underscore) Using Virtuals
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true
});

exports.Category = mongoose.model('Category', categorySchema);
