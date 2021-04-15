const express = require('express')
const event = express.Router()
const EventModel = require('../models/eventModel')

event.get('/', (req, res) => {
    res.send('Get route is working')
})

module.exports = event