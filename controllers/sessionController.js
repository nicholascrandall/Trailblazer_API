const express = require('express');
const session = express.Router()
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// New Session Route --- AKA User Login
session.get('/new',(req,res)=>{
// not yet sure wht to do for routing to the login page
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
                    res.status(200).json({message: "Successfully Signed In: " + foundUser.username})
                    // res.redirect() not sure where to route ppl to 
                } else {
                    res.status(400).json({message: "Invalid Password"})
                    // res.render() not sure where to route ppl to (invlaid password)
                }
            } else {
                res.status(400).json({message: "Invalid Username"})
                // res.render() invalid usename
            }
        }
    })
})

/// Destroy Session Route 
session.delete('/',(req,res)=>{
    const loggedOutUser = req.session.currentUser.username
    req.session.destroy( err => {
        if (err) {
            res.status(400).json({message: err.message})
        } else {
            res.status(200).json({message: "Successfully Logged Out: " + loggedOutUser})
        }
        res.redirect('/user/login')
    })
})

module.exports = session