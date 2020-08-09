const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const e = require('express');

router.get('/', async (req, res, next) => {
    try {
        const results = await Product.find(
            {}, 
            { __v: 0 });
        res.send(results);
    } catch (error) {
        console.error(error.message);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();

        res.send(result);
    } catch (error) {
        console.error(error.message);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id, { __v: 0 });
        res.send(product);
    } catch (error) {
        console.error(error.message);
    }
});

router.put('/:id', (req, res, next) => {
    //const err = new Error("Access Denied By Keycloak");
    //err.status = 401;
    //next(err);
});

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };
        const product = await Product.findByIdAndUpdate(id, updates, options);
        res.send(product);
    } catch (error) {
        console.error(error.message);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Product.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        console.error(error.message);
    }
});
module.exports = router;