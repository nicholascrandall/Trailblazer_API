const { Router } = require('express')
const express = require('express')
const profile = express.Router()
const UserModel = require('../models/userModel')

//profile route
profile.get('/:username', (req, res) => {
    UserModel.findOne({username: req.params.username}, (error, foundProfile) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        console.log(req.session.currentUser)
        res.status(200).json({data: foundProfile, currentUser: req.session.currentUser})
    })
})

//DELETE user - not sure if we want this in

// profile.delete('/:username', (req, res) => {
//     UserModel.findOneAndDelete({username: req.params.username}, (error, deletedProfile) => {
//         if (error) {
//             res.status(400).json({error: error.message})
//         }
//         else if (deletedProfile === null) {
//             res.status(404).json({message: "Profile not found"})
//         }
//         else {
//             res.status(200).json({message: "Profile deleted successfully"})
//         }
//     })
// })

//UPDATE profile
profile.put('/:username', (req, res) => {
    UserModel.findOneAndUpdate({username:req.params.username}, req.body, {new: true}, (err, updatedProfile) => {
        if(err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json({data: updatedProfile, currentUser: req.session.currentUser})
    })
})



// PATCH ROUTE - reset to default avatar
profile.patch('/:username', (req, res) => {
    UserModel.findOneAndUpdate({ username: req.params.username }, { $set: { avatar: "../public/default_avatar.png" } }, {new:true}, (error, updatedProfile) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json({data: updatedProfile, currentUser: req.session.currentUser})
    })
})


module.exports = profile