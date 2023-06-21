// import router and model
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// handle get request
blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

// handle post request
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    // save blog into database 
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter