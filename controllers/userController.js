const express = require('express');
const user = express.Router()
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// ROUTES

// Get all Users
user.get('/', (req,res)=>{
    UserModel.find({},(err, foundUsers)=>{
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            res.status(200).json(foundUsers)
        }
    })
})

//New User Route
user.post('/',(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    UserModel.create(req.body,(err, newUser)=>{
        if (err) {
            if(err.code === 11000){
                res.status(400).json({message: "That username is not available", status: 400})
            }else{
                res.status(400).json({message: err.message})
            }
        } else {
            res.status(201).json({
                message: `new user, ${newUser.username}, created successfully.`,
                status: 201,
                data: newUser
            })
            // res.redirect('/event') --> this makes it mad, need ot figure out how to redirect
        }
    })
})

module.exports = user