const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();

// Accept Content-Type application/json
app.use(express.json());
// Accept Content-Type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Mongo Atlas
// api-user
// 0GZCvkRqaQ8xDs0w
mongoose.connect('mongodb+srv://cluster0.sfdso.mongodb.net', {
    dbName : 'rest-api',
    user : 'api-user',
    pass: '0GZCvkRqaQ8xDs0w',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log('Mongodb connected')
});

// Mongo Local Docker
// mongoose.connect('mongodb://localhost:28017/rest-api', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Mongodb connected')
// });

const ProductRoute = require('./routes/product.route');
app.use('/products', ProductRoute);

// 404 handler and pass to error handler
app.use((req, res, next) => {
    // const err = new Error("Not found");
    // err.status = 404;
    // next(err);
    next(createError(404, 'Not found'));
});

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error : {
            status : err.status || 500,
            message : err.message
        }
    });
});

app.listen(3000, () => {
    console.log('Server starter on port 3000');
});