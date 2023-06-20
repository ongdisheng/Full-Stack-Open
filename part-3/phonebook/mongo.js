// import library
const mongoose = require('mongoose')

// invalid action
if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('invalid action')
    process.exit(1)
}

// retrieve password from command line
const password = process.argv[2]

// connect to database 
const url = 
    `mongodb+srv://fullstack:${password}@cluster0.njck2mu.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

// define schema 
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// define model
const Person = mongoose.model('Person', personSchema)

// save person to database 
if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    person
        .save()
        .then(result => {
            console.log(`added ${result.name} number ${result.number} to phonebook`)
            mongoose.connection.close()
        })
} 

// query from database
if (process.argv.length === 3) {
    Person  
        .find({})
        .then(persons => {
            console.log('phonebook:')
            persons.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
}