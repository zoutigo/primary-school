const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    author : {
        type: mongoose.Objectid ,
        required : true
    },
    date: {
        type: Date ,
        required: true

    },
    createdAt: {
        type: Date ,
        default: Date.now(),
        required: true
    },
    update : [{author: mongoose.Objectid, date: Date}],
    comments: [{author: mongoose.ObjectId , content: String, createdAt: Date}],
    images: [{type: mongoose.ObjectId, position: Number}],
    externalMediaPath: [{type : String, url: String}]

})


module.exports = mongoose.model('Event', eventSchema)