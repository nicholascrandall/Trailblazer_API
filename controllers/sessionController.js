const express = require('express');
const session = express.Router()
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Get the current session 
session.get('/',(req,res)=>{
    req.session.currentUser?
        res.json({currentUser: req.session.currentUser}):
        res.status(400).json({message: 'there is no current active session'})
})

// Create Session Route 
session.post('/',(req,res)=>{
    UserModel.findOne({username: req.body.username},(err, foundUser)=>{
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            if(foundUser){
                if(bcrypt.compareSync(req.body.password,foundUser.password)){
                    req.session.currentUser = foundUser
                    res.status(200).json({message: "Successfully Signed In: " + foundUser.username, status: 200, currentUser: req.session.currentUser})
                } else {
                    res.status(400).json({message: "Invalid Password", status: 400})
                }
            } else {
                res.status(400).json({message: "Invalid Username", status: 400})
            }
        }
    })
})

/// Destroy Session Route 
session.delete('/',(req,res)=>{
    req.session.destroy( err => {
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            res.status(200).json({message: "Successfully Logged Out"})
        }
    })
})

module.exports = session