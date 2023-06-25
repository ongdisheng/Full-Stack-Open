// import router and model
const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// handle get request
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

// handle post request
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter