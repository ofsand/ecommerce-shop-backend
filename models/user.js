const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

//Token Generation
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.secret);
    return token;
};

//changing _id to id (removing the underscore) Using Virtuals
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});

exports.User = mongoose.model("User", userSchema);
