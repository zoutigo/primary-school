const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        required: true
    },
    role : {
        type: String ,
        enum: ['parent', 'teatcher', 'admin'],
        required: true
    }
   
})

module.exports = mongoose.model('User', userSchema)