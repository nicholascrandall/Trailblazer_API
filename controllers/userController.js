const express = require('express');
const user = express.Router()
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// ROUTES

// Sign Up Route
user.get('/new', (req,res)=>{
// not yet sure what to do for routing ppl to create user page
})

//New User Route
user.post('/',(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    UserModel.create(req.body,(err, newUser)=>{
        if (err) {
            if(err.code === 11000){
                res.status(400).json({message: "That username is not available"})
            }else{
                res.status(400).json({message: err.message})
            }
        } else {
            res.status(201).json({
                message: `new user, ${newUser.title}, created successfully.`,
                data: newUser
        })
        }
    })
})

module.exports = user