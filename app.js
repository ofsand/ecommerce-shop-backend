const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

/*
const authJwt = require('./helpers/jwt')
*/
require('dotenv/config');


const api = process.env.API_URL;
//import Routers
const productRouter = require('./routers/products');
const categoryRouter = require('./routers/categories');
const userRouter = require('./routers/users');
const { json } = require('express');
//const reviewRouter = require('./routers/reviews');

//
app.use(cors());
app.options('*', cors());

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
/*
app.use(authJwt);
*/
/*
app.use((error, req, res, next => {
    if(error) {
        res.status(500).json({message: error });
    }
}))
*/

//Router
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);
//app.use(`${api}/review`, reviewRouter);


//Mongoose connection
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

//Listenning to port 3000
app.listen(3000, () => {
    console.log("server is running on 3000");
})