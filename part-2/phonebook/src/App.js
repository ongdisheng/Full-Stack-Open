import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

// app component 
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // define event handler functions
  // modify name input element 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // modify number input element
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // modify filter input element
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // submit person details through form
  const addPerson = (event) => {
    event.preventDefault()

    // handle duplicate names
    const duplicates = persons.filter(person => person.name === newName)
    if (duplicates.length > 0) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  // filter displayed persons
  const personsToShow =
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
 
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <h2>Add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App