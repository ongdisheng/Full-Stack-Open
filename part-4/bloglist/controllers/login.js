// import statements 
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// handle post request 
loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    // retrieve user from database
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    // sign using secret key
    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).json({ token, username: user.username, name: user.name })
})


module.exports = loginRouter