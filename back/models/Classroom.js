const mongoose = require('mongoose')
const { schema, model } = require('./User')
const Schema = mongoose.Schema

const classroomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    presentation: {
        type: String
    },
    level : {
        type: String ,
        enum : ['ps', 'ms', 'gs', 'ce1', 'ce2', 'cm1', 'cm2'],
        required: true
    },
    promotion : {
        type: Date,
        required: true
    },
    teatcher : {
        type: mongoose.ObjectId
    },
    otherTeatchers : [otherTeacher],
    parents : [{type: mongoose.ObjectId }]
})

module.exports = mongoose.model('Classroom', classroomSchema)