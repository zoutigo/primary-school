const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { commentSchema , Comment } = require('./Comment')
const { pictureSchema, Picture} = require('./Picture')

const eventSchema = new Schema({
    title: {
        type: String ,
        min: 10 ,
        max: 50,
        required: true
    },
    content: {
        type: String ,
        min: 10 ,
        required: true

    },
    eventDate : {
        type: Date ,
        required: true
    },

    author : {
        type: Schema.Types.ObjectId
     
    },
    createdAt: {
        type: Date ,
        default: Date.now(),
        required: true
    },
    update : [{author: Schema.Types.ObjectId, date: Date}],
    comments: [{type:Schema.Types.ObjectId}],
    images:[pictureSchema],
    mediaPath: [{type : String, url: String}]

})


module.exports = mongoose.model('Event', eventSchema)