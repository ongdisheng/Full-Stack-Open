// import library
const mongoose = require('mongoose')

// define schema 
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// format blogs returned from database  
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// export model
module.exports = mongoose.model('Blog', blogSchema)