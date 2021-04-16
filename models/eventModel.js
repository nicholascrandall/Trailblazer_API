const mongoose = require('mongoose')
const {Schema, model} = mongoose

const eventSchema = new Schema({
    name: {type: String, required:true, default: "My Event"},
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