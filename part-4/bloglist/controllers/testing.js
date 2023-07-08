// import router and model
const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// handle post request
testingRouter.post('/reset', async (request, response) => {
    // delete existing blogs and users
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = testingRouter