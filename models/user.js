const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String
})

exports.User = mongoose.model("User", userSchema);