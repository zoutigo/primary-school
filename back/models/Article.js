const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    author : {
        type: mongoose.ObjectId
    },
    modelArticle: {
        type: mongoose.ObjectId
    },
    createdAt: {
        type: Date ,
        default: Date.now(),
        required: true
    },
    comments: [{author: mongoose.ObjectId , content: String, createdAt: Date}],
    images: [{type: mongoose.ObjectId, position: Number}],
    externalMediaPath: [{type : String, url: String}]
})

module.exports = mongoose.model('Article', articleSchema)