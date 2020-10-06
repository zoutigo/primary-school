const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const { commentSchema , Comment } = require('./Comment')
const { pictureSchema, Picture} = require('./Picture')

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category : {
        type: String,
        enum: ['news', 'information', 'classActivity']
    },
    content: {
        type: String, 
        required: true
    },
    
    modelArticle: {
        type: Schema.ObjectId
    },
    createdAt: {
        type: Date ,
        default: Date.now(),
        required: true
    },
    comments: [commentSchema],
    images:[pictureSchema],
    mediaPath: [{type : String}]
})

module.exports = mongoose.model('Article', articleSchema)