const router = require('express').Router()
const {createComment, listItemComments, updateComment, deleteComment , readComment} = require('../controllers/commentController')
const verifToken = require('../validators/tokens')

// Get comments list
router.get('/list/:itemId', verifToken,  listItemComments)

// Create a comment
router.post('/create/:itemId', verifToken, createComment)


// Read a comment
router.get('/read/:itemId/:id', verifToken, readComment)

// Update a comment (just the like)
router.put('/update/:itemId/:id',verifToken, updateComment)


// Delete a comment
router.delete('/delete/:itemId/:id',verifToken, deleteComment)


module.exports = router