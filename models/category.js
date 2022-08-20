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
categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true
});

exports.Category = mongoose.model('Category', categorySchema);
