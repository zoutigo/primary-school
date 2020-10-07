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
        enum: ['news', 'information', 'classActivity'],
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
    comments: [commentSchema],
    images:[pictureSchema],
    mediaPath: [{type : String}],
    status: {
        type: String ,
        enum: ['draft', 'undervalidation', 'released'],
        default:'released'
    }
})

module.exports = mongoose.model('Article', articleSchema)