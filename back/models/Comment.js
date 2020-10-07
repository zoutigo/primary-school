
const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports.commentSchema = new Schema({
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
    likes: [{
        author: {type: Schema.ObjectId},
        like : {type: Number, min:0 , max: 1}
    }],
    createdAt: {
        type: Date ,
        default: Date.now(),
        required: true
    }
})

//module.exports = mongoose.model('Comment', commentSchema)