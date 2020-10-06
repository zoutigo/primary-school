const { Mongoose } = require("mongoose")

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: {
        type: String,
        min: 2,
        max: 300,
        required: true
    },
    author: {
        type: Schema.ObjectId ,
        ref: 'User'
    },
    createdAt: {
        type: Date ,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)