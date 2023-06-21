import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

// app component 
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)

  // fetch data from server using effect hook
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

  // delete person from phonebook
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    
    // confirm deletion using pop up window
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  // submit person details through form
  const addPerson = (event) => {
    event.preventDefault()

    // handle duplicate names
    const person = persons.find(person => person.name === newName)
    if (person) {
      
      // retrieve id of existing person
      const id = person.id

      // confirm number replacement using pop up window
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Modified ${person.name}`)
            setStatus('success')

            // remove notification after 5s
            setTimeout(() => {
              setMessage(null)
              setStatus(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Information of ${person.name} has already been removed from server`)
            setStatus('error')

            // remove notification after 5s
            setTimeout(() => {
              setMessage(null)
              setStatus(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      // send to server
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returnedPerson.name}`)
          setStatus('success')
          
          // remove notification after 5s
          setTimeout(() => {
            setMessage(null)
            setStatus(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setStatus('error')

          // remove notification after 5s
          setTimeout(() => {
            setMessage(null)
            setStatus(null)
          }, 5000)
        })
    }
  }

  // filter displayed persons
  const personsToShow =
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
 
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification 
        message={message}
        status={status} 
      />

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
      <Persons 
        persons={personsToShow} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App