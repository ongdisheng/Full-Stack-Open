// import library
const mongoose = require('mongoose')

// define schema
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String
})

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