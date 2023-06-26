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

    // verify token 
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    // retrieve user from database 
    const user = await User.findById(decodedToken.id)

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
    // verify token 
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    // retrieve blog and user from database 
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

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