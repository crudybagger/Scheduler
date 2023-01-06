//make a schedule model
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const scheduleSchema = new Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    userId: { type: String, required: true }
});
module.exports = mongoose.model('Schedule', scheduleSchema);