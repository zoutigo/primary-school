const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {
        type: String ,
        required: true,
        min: 2
    },
    fisrtname: {
        type: String ,
        required: true,
        min: 2
    },
    dateOfBirth: {
        type: Date ,
        required: true
    },
    classroom: {
        type: Schema.ObjectId ,
        ref: 'Classroom'
    },
    parents : {
        type: Schema.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Student', studentSchema)