// import router and model
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// handle get request
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

// handle post request
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    // create blog
    const blog = new Blog({
        ...body,
        likes: body.likes || 0
    })

    // save blog into database 
    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogsRouter