const express = require('express');

const app = express();

const ProductRoute = require('./routes/product.route');
app.use('/products', ProductRoute);

app.listen(3000, () => {
    console.log('Server starter on port 3000');
});