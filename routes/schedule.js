// make a schedule route
const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const checkAuth = require('../middleware/check-auth.js');
//get all schedules
router.get('/', checkAuth, (req, res, next) => {
    Schedule.find()
        .then(schedules => {
            res.status(200).json({
                message: 'Schedules fetched successfully',
                schedules: schedules
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
//get a schedule by id
router.get('/:id', checkAuth, (req, res, next) => {
    Schedule.findById(req.params.id)
    .then(schedule => {
        if (schedule) {
            res.status(200).json(schedule);
        } else {
            res.status(404).json({ message: 'Schedule not found' });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});
//create a schedule
router.post('/', checkAuth, (req, res, next) => {
    Schedule.create({
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        userId: req.body.userId
    }).then(result => {
        res.status(201).json({
            message: 'Schedule created',
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//update a schedule
router.put('/:id', checkAuth, (req, res, next) => {
    Schedule.findByIdAndUpdate(req.params.id, {
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        userId: req.body.userId
    }).then(result => {
        res.status(200).json({
            message: 'Schedule updated',
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//delete a schedule
router.delete('/:id', checkAuth, (req, res, next) => {
    Schedule.findByIdAndDelete(req.params.id)
    .then(result => {
        res.status(200).json({
            message: 'Schedule deleted',
            result: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;