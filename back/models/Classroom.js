const mongoose = require('mongoose')
const { pictureSchema, Picture} = require('./Picture')
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
    year : {
        type: Date,
        required: true
    },
    teatcher : {
        type: Schema.ObjectId,
        ref: 'User'
    },
    otherTeatchers : [otherTeacher],
    students : [{
        type: Schema.ObjectId,
        ref: 'Student'
     }],
     images:[pictureSchema],
})

module.exports = mongoose.model('Classroom', classroomSchema)