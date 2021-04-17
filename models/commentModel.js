const mongoose = require('mongoose')
const {Schema, model} = mongoose

const commentSchema = new Schema({
    username: String,
    time: {type: Date, default: Date.now}, 
    content: String,
    rating: Number,
})

module.exports = model('Comment', commentSchema)