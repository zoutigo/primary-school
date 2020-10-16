const router = require('express').Router()
const {createEvent, listEvents, readEvent, updateEvent, deleteEvent} = require('../controllers/eventController')

// Get event list
router.get('/list', listEvents)

// Create a event
router.post('/create', createEvent)


// Read a event
router.get('/read/:id', readEvent)

// Update a event (just the like)
router.put('/update/:id', updateEvent)


// Delete a event
router.delete('/delete/:id', deleteEvent)


module.exports = router