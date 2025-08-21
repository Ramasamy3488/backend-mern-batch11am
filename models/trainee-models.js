const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conn = require('../db');

conn.connectToMongoDB();

const traineeSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter the Trainee Name"]
    },
    email: {
        type: String,
        required: [true, "Please enter the Trainee Email"],
        unique: [true, "Email must be unique"],
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    batch: {
        type: String,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    timings: {
        type: String
    },
    year: {
        type: Number,
        min: [2000, "Year must be 2000 or later"],
        max: [2100, "Year must be 2100 or earlier"]
    },
    age: {
        type: Number,
        min: [18, "Age must be over 18 years!"]
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const TraineesCollection = mongoose.model("trainees", traineeSchema);

module.exports = TraineesCollection;