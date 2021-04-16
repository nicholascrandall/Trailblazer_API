const express = require('express');
const user = express.Router()
const UserModel = require('../models/userModel');

// ROUTES

//New User Route
user.post('/',(req,res)=>{
    UserModel.create(req.body,(err, newUser)=>{
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            res.status(201).json({
                message: `new user, ${newUser.title}, created successfully.`,
                data: newUser
        })
        }
    })
})

module.exports = user