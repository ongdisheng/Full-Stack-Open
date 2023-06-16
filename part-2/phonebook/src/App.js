import { useState } from 'react'

// person component
const Person = ({ name }) => (
  <p>{name}</p>
)

// app component 
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  // define event handler functions
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    // handle duplicate names
    const duplicates = persons.filter(person => person.name === newName)
    if (duplicates.length > 0) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const nameObject = {
        name: newName
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNameChange}
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
        />
      )}
    </div>
  )
}

export default App