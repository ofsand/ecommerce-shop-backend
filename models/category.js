const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    }
})

//changing _id to id (removing the underscore) Using Virtuals
categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true
});

exports.Category = mongoose.model('Category', categorySchema);
