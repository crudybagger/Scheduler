//make a server with routes for users and schedules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');

mongoose.connect('mongodb://localhost:27017/schedule', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoutes);
app.use('/schedules', scheduleRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});