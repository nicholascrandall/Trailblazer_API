const mongoose = require('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema({
    username: {unique:true, required:true, type: String},
    password: {required:true, type: String},
    fullname: {type:String, default: "Anonymous Hiker"},
    avatar: {type:String, default: "some.link.here"}, 
    about: String,
})

module.exports = model('User', userSchema)