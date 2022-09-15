//Mongoose connection
const mongoose = require('mongoose');

module.exports = async () => {
    mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME
    })
    .then(() => {
        console.log('Database is Connected');
    })
    .catch((err) => {
        console.log('Database not Connected: '+err);
    })
};