// person component
const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </p>
    </div>
  )
}

// persons component 
const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person =>
        <Person 
          key={person.name} 
          person={person}
          deletePerson={deletePerson}
        />
      )}
    </div>
  )
}

export default Persons