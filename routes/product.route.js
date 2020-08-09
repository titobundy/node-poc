const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/', (req, res, next) => {
    res.send('getting a list of all products');
});

router.post('/', async (req, res, next) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();

        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', (req, res, next) => {
    res.send('getting a single product');
});

router.put('/:id', (req, res, next) => {
    //const err = new Error("Access Denied By Keycloak");
    //err.status = 401;
    //next(err);
});

router.patch('/:id', (req, res, next) => {
    res.send('updating a single product');
});

router.delete('/:id', (req, res, next) => {
    res.send('deleting a single product');
});
module.exports = router;