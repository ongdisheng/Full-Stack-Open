// create server
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

// middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

// handle get request for persons 
app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
})

// handle get request for info 
app.get('/info', (request, response) => {
    // retrieve current date 
    const date = new Date()

    // format string
    const str = `
        Phonebook has info for ${persons.length} people
        <br/>
        ${date}
    `
    response.send(str)
})

// handle get request for a specific person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    // retrieve person based on id
    const person = persons.find(p => p.id === id)

    // person exists
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// handle delete request for a specific person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    // delete person with specified id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

// handle post request for persons
app.post('/api/persons', (request, response) => {
    // retrieve new data from request
    const body = request.body

    // missing data
    if (!body.name || !body.number) {
        return response
                    .status(400)
                    .json({error: 'missing name or number'})
    }

    // // found existing person with same name 
    // const existingPerson = persons.find(p => p.name === body.name)
    // if (existingPerson) {
    //     return response
    //             .status(400)
    //             .json({error: 'name must be unique'})
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    // save to database
    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
})

// listen to requests on specified port
const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})