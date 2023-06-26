// import library
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') 

// define schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    name: String,
    passwordHash: String
})

userSchema.plugin(uniqueValidator)

// format users returned from database 
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)