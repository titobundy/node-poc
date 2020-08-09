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