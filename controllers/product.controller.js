const createError = require('http-errors');
const mongoose = require('mongoose');

const Product = require('../models/product.model');

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const results = await Product.find(
                {}, 
                { __v: 0 });
            res.send(results);
        } catch (error) {
            console.error(error.message);
        }
    }
    ,
    createNewProduct: async (req, res, next) => {
        try {
            const product = new Product(req.body);
            const result = await product.save();
    
            res.send(result);
        } catch (error) {
            console.error(error.message);
            if(error.name === 'ValidationError') {
                return next(createError(422, error.message));
            }
            next(error);
        }
    }
    ,
    findProductById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const product = await Product.findById(id, { __v: 0 });
            if(!product) {
                throw createError(404, 'Product does not exist.');
            }
            res.send(product);
        } catch (error) {
            console.error(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid product id'));
                return;
            }
            next(error);
        }
    }
    ,
    updateProduct: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };
            const product = await Product.findByIdAndUpdate(id, updates, options);
            if(!product) {
                throw createError(404, 'Product does not exist.');
            }
            res.send(product);
        } catch (error) {
            console.error(error.message);
            if(error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid product id'));
            }
            next(error);
        }
    }
    ,
    deleteProduct: async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await Product.findByIdAndDelete(id);
            if(!result) {
                throw createError(404, 'Product does not exist.');
            }
            res.send(result);
        } catch (error) {
            console.error(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid product id'));
                return;
            }
            next(error);
        }
    }

}