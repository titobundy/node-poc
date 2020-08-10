const express = require('express');
const createError = require('http-errors');

const app = express();

// Accept Content-Type application/json
app.use(express.json());
// Accept Content-Type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Initialize Mongo DB
require('./initDb')();

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