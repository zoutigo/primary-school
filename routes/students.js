const router = require('express').Router()
const {createStudent, listStudents,  readStudent, updateStudent, deleteStudent } = require('../controllers/studentController')
const verifToken = require('../validators/tokens')

// Get student list
router.get('/list', verifToken,  listStudents)

// Create astudent
router.post('/create', verifToken, createStudent)


// Read a student
router.get('/read/:id', verifToken, readStudent)

// Update a student 
router.put('/update/:id', verifToken, updateStudent)

// Delete a student
router.delete('/delete/:id', verifToken, deleteStudent)


module.exports = router