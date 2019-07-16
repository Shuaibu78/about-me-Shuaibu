const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1){
        return res.status(409).json({
            message: 'mail exists'
        });
    } else{
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: req.body.password
        });
        user
            .save()
            .then(result => {
                console.log(result)
                res.status(201).json({
                    message: 'User created'
                });
            })
            .catch(err => {
                console.log(500).json({
                    error: err
                });
            });
        }
        });
    });

router.get('/', (req, res, next) => {
    User.find({}).then(user => {
        res.send(user);
    });
})

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;