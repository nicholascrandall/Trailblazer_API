const express = require('express')
const event = express.Router()
const EventModel = require('../models/eventModel')
const eventSeed = require('../models/eventsSeed')

//index
event.get('/', (req, res) => {
    EventModel.find({}, (error, foundEvents) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        console.log(req.session.currentUser);
        res.status(200).json({data:foundEvents, currentUser: req.session.currentUser})
    })
})

//search
event.get('/search', (req, res) => {
    EventModel.fuzzySearch({query: req.query.query}, (error, foundEvents) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        console.log(req.session.currentUser);
        res.status(200).json({data: foundEvents, currentUser: req.session.currentUser})
    })
})

//event seeding
event.get('/seed', (req, res) => {
    EventModel.create(eventSeed, (err, newEvents) => {
        if (err) {
            res.status(400).json({ err: err.message });
        }
        res.status(200).json({data: newEvents, currentUser: req.session.currentUser})
    })
})

//show
event.get('/:id', (req, res) => {
    EventModel.findById(req.params.id, (error, foundEvent) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        console.log(req.session.currentUser)
        res.status(200).json({data: foundEvent, currentUser: req.session.currentUser})
    })
})

//create
event.post('/', (req, res) => {
    EventModel.create(req.body, (error, createdEvent) => {
        if (error) {
            res.status(400).json({ error: error.message, status: 400 })
        }
        res.status(200).json({data: createdEvent, currentUser: req.session.currentUser, status: 200})
    })
})

//delete
event.delete('/:id', (req, res) => {
    EventModel.findByIdAndDelete(req.params.id, (error, deletedEvent) => {
        if (error) {
            req.status(400).json({ error: error.message })
        }
        else if (deletedEvent === null) {
            res.status(404).json({ message: "Event Not Found" })
        }
        res.status(200).json({ message: deletedEvent.name + " deleted successfully", currentUser: req.session.currentUser })
    })
})

//update
event.put('/:id', (req, res) => {
    EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEvent) => {
        if(err) {
            res.status(400).json({ error: err.message, status: 400 })
        }
        res.status(200).json({data: updatedEvent, status: 200 })
    })
})


module.exports = event