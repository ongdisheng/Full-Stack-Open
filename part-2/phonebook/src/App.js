import { useState } from 'react'

// person component
const Person = ({ name, number }) => (
  <p>{name} {number}</p>
)

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

  // define event handler functions
  // modify name input element 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // modify number input element
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person 
          key={person.name} 
          name={person.name} 
          number={person.number}
        />
      )}
    </div>
  )
}

export default App