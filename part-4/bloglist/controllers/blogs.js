// import router and model
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// handle get request
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

// handle post request
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    // retrieve user from request object
    const user = request.user
    if (!user) {
        return response.status(401).end()
    }

    // create blog
    const blog = new Blog({
        ...body,
        likes: body.likes || 0,
        user: user._id
    })

    // save blog into database 
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

// handle delete request
blogsRouter.delete('/:id', async (request, response) => {
    
    // retrieve blog and user 
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    // remove blog
    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).end()
    }
})

// handle update request
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        ...body,
        likes: body.likes || 0
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter