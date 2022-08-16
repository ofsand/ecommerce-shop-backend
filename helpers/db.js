//Mongoose connection
const mongoose = require('mongoose');

module.exports = async () => {
    mongoose.connect('mongodb+srv://ofsand:dnasfo@cluster0.tmpxvq6.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'eshop_db'
    })
    .then(() => {
        console.log('Database is Connected');
    })
    .catch((err) => {
        console.log('Database not Connected: '+err);
    })
};