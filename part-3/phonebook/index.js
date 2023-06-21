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

    Person
        .count()
        .then(count => {
            // format string
            const str = `
                Phonebook has info for ${count} people
                <br/>
                ${date}
            `
            response.send(str)
        })
})

// handle get request for a specific person
app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// handle delete request for a specific person
app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(removedPerson => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// handle update request for a specific person
app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person  
        .findByIdAndUpdate(
            request.params.id, 
            { name, number }, 
            { new: true, runValidators: true, context: 'query' }
        )
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// handle post request for persons
app.post('/api/persons', (request, response, next) => {
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
        .catch(error => next(error))
})

// unknown endpoint middleware
const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// error middleware 
const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

// listen to requests on specified port
const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})