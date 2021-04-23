const express = require('express')
const event = express.Router()
const EventModel = require('../models/eventModel')
const eventSeed = require('../models/eventsSeed')
const MongoQS = require('mongo-querystring');

const qs= new MongoQS

//index
event.get('/', (req, res) => {
    let query = {} 
    if(req.query){query=qs.parse(req.query)}
    EventModel.find(query, (error, foundEvents) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json({data:foundEvents, currentUser: req.session.currentUser})
    })
})

//search
event.get('/search', (req, res) => {
    EventModel.fuzzySearch({query: req.query.query}, (error, foundEvents) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
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
            req.status(400).json({ error: error.message, status: 400 })
        }
        else if (deletedEvent === null) {
            res.status(404).json({ message: "Event Not Found", status: 404 })
        }
        res.status(200).json({ message: deletedEvent.name + " deleted successfully", status: 200 })
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

//join an event
event.patch('/:id/join', (req, res) => {
    EventModel.findByIdAndUpdate(req.params.id, {$push:{attendees: req.body.username}}, {new:true}, (error, joinedEvent) => {
        if (error) {
            res.status(400).json({ error: error.message, status: 400 })
        }
        res.status(200).json({data: joinedEvent, status: 200 })
    })
})

//leave an event
event.patch('/:id/leave', (req, res) => {
    EventModel.findByIdAndUpdate(req.params.id, {$pull:{attendees: req.body.username}}, {new:true}, (error, leftEvent) => {
        if (error) {
            res.status(400).json({ error: error.message, status: 400 })
        }
        res.status(200).json({data: leftEvent, status: 200 })
    })
})

module.exports = event