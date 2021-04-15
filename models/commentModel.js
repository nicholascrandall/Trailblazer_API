const mongoose = require('mongoose')
const {Schema, model} = mongoose

const commentSchema = new Schema({
    username: String,
    time: {type:Timestamp, default: date.now}, 
    content: String,
    rating: Number,
})

module.exports = model('Comment', commentSchema)