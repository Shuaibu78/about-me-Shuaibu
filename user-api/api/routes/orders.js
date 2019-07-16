const express = require('express');
const router = express.Router();

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Orders details'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        Quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Orders were fetched'
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order deleted',
        orderId: req.params.orderId
    });
});
module.exports = router;