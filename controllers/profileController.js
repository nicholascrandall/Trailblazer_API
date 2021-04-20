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

module.exports = profile