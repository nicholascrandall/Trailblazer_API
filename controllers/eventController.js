const express = require('express')
const event = express.Router()
const EventModel = require('../models/eventModel')

//index
event.get('/', (req, res) => {
    EventModel.find({}, (error, foundEvents) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundEvents)
    })
})

//create
event.post('/', (req, res) => {
    EventModel.create(req.body, (error, createdEvent) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(createdEvent)
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
        res.status(200).json({ message: deletedEvent.name + " deleted successfully" })
    })
})

//update
event.put('/:id', (req, res) => {
    EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEvent) => {
        if(err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(updatedEvent)
    })
})


module.exports = event