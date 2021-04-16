const mongoose = require('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema({
    username: {unique:true, required:true, type: String},
    password: {required:true, type: String},
    fullname: {type:String, default: "Anonymous Hiker"},
    avatar: {type:String, default: "../public/default_avatar.png"}, 
    about: String,
    isAdmin: {type:Boolean, default:false}
})

module.exports = model('User', userSchema)