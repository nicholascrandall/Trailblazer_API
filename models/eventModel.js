const mongoose = require('mongoose')
const {Schema, model} = mongoose
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const eventSchema = new Schema({
    name: {type: String, required:true, default: "My Event"},
    lat: Number,
    long: Number,
    city: String,
    state: String,
    date: Date,
    creator: {type: String, required:true},
    maxAttendees: Number,
    attendees: Array, 
    details:{
        difficulty: Number, 
        activityType: String,
        supplies: Array,
        description: String,
        },
    img: String,
    comments: [String],
})

eventSchema.plugin(mongooseFuzzySearching, { fields: ['name'] })

module.exports = model('Event', eventSchema)