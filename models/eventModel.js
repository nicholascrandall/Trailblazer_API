const mongoose = require('mongoose')
const {Schema, model} = mongoose

const eventSchema = new Schema({
    lat: Number,
    long: Number,
    date: Date,
    creator: String, 
    maxAttendees: Number,
    attendees: Array, 
    details:{
        difficulty: Number, 
        activityType: String,
        supplies: Array
        },
    img: String,
    comments: [String],
})

module.exports = model('Event', eventSchema)