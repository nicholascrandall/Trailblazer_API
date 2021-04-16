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
            console.log(err);
        } else {
            if(foundUser){
                if(bcrypt.compareSync(req.body.password,foundUser.password)){
                    req.session.currentUser = foundUser
                    // res.redirect() not sure where to route ppl to 
                } else {
                    // res.render() not sure where to route ppl to (invlaid password)
                }
            } else {
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
            console.log(err);
        } else {
            console.log("Successfully Logged Out: " + loggedOutUser);
        }
        // res.redirect() need to redirect ppl back to login page 
    })
})

module.exports = session