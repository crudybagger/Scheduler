//make a users route
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth.js');
//get all users
router.get('/', checkAuth, (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).json({
                message: 'Users fetched successfully',
                users: users
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
//get a user by id
router.get('/:id', checkAuth, (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//create a user
router.post('/signup', (req, res, next) => {
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }).then(result => {
        res.status(201).json({
            message: 'User created',
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//login a user
router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, 'secret', { expiresIn: '1h' });
            return res.status(200).json({
                message: 'Auth successful',
                token: token
            });
        }
        return res.status(401).json({
            message: 'Auth failed'
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//delete a user
router.delete('/:id', checkAuth, (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;