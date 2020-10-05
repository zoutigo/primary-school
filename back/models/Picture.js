const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pictureSchema = new Schema({
    name: {
        type: String,
        required: true ,
        max: 1024
    },
    author : {
        type: mongoose.ObjectId ,
        required : true
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    parent: {
        type : mongoose.ObjectId
    }
})

module.exports = mongoose.model('Picture', pictureSchema)