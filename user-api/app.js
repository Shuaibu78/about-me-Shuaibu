const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://sultan:'+ process.env.MONGO_ATLAS_PW +'@user-signup-api-uhbdf.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH, DELETE")
        return res.status(200).json({});
    }
    next();
});

app.use('/product', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);



module.exports = app;