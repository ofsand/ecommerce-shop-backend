const express = require('express');
const { join } = require('path');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const secret = process.env.secret;
const connection = require('./helpers/db');
require('dotenv/config');
const auth = require("./helpers/auth");
const errorHandler = require('./helpers/error-handlerjs')

const authJwt = require('./helpers/jwt');

const api = process.env.API_URL;


const port = process.env.PORT || 3000


//Middleware
connection();
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/public/uploads', express.static(join(__dirname, '/public/uploads')));
//app.use('/uploads', express.static('uploads'))
app.use(authJwt());
app.use(errorHandler);
//app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
//app.use(express.static(__dirname + 'public/uploads'));
//app.use('/public/uploads',express.static(__dirname + '/public/uploads'));
//app.use(express.static('/public/uploads'))

//app.use(express.static(join(__dirname, '/public/uploads')));
//app.use(auth("customer:read"));



//import Routers
const productRouter = require('./routers/products');
const categoryRouter = require('./routers/categories');
const userRouter = require('./routers/users');
const reviewsRouter = require('./routers/reviews');
const ordersRouter = require('./routers/orders');
const { json } = require('express');

//
app.use(cors());
app.options('*', cors());


//Router
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/reviews`, reviewsRouter);

//app.use(`${api}/review`, reviewRouter);


//Listenning to port 3000
app.listen(port, () => {
    console.log("server is running on 3000");
})