// create server
const express = require('express')
const app = express()

app.use(express.json())

// person data
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// handle get request for persons 
app.get('/api/persons', (request, response) => {
    response.json(persons)
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

const generateId = () => {
    return Math.floor((Math.random() * 10000))
}

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

    // found existing person with same name 
    const existingPerson = persons.find(p => p.name === body.name)
    if (existingPerson) {
        return response
                .status(400)
                .json({error: 'name must be unique'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    // append newly created person
    persons = persons.concat(person)

    response.json(person)
})

// listen to requests on specified port
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})