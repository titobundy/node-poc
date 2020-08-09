const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('getting a list of all products');
});

router.post('/', (req, res, next) => {
    res.send('product created');
});

router.get('/:id', (req, res, next) => {
    res.send('getting a single product');
});

router.patch('/:id', (req, res, next) => {
    res.send('updating a single product');
});

router.delete('/:id', (req, res, next) => {
    res.send('deleting a single product');
});
module.exports = router;