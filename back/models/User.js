const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {pictureSchema} = require('./Picture')

const userSchema = new Schema({
    name: {
        type: String
    },
    firstname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String ,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    role : {
        type: String ,
        enum: ['parent', 'teatcher', 'moderator', 'admin'],
        required: true
    },
    images:[pictureSchema],
    presentation: {
        type: String
    },
    articles: [{
        type: Schema.ObjectId,
        ref: 'Article'
    }],
    news : [{
        type: Schema.ObjectId,
        ref: 'News'
    }]
   
})

module.exports = mongoose.model('User', userSchema)