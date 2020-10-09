const mongoose = require('mongoose')
const { commentSchema } = require('./Comment')
const { pictureSchema, Picture} = require('./Picture')

const Schema = mongoose.Schema
const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category : {
        type: String,
        enum: ['news', 'information', 'activity'],
        required: true
    },
    target: {
        type: String ,
        enum: ['classroom','school','public'],
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    
    modelArticle: {
        type: String,
        enum : ['A', "B","C","D","E"],
        required: true
    },
    createdAt: {
        type: Date ,
        default: Date.now(),
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema],
    images:[pictureSchema],
    mediaPath: [{type : String}],
    status: {
        type: String ,
        enum: ['draft', 'undervalidation', 'released'],
        default:'draft'
    }
})

module.exports = mongoose.model('Article', articleSchema)