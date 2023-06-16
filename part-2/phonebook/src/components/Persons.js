// person component
const Person = ({ name, number }) => (
  <p>{name} {number}</p>
)

// persons component 
const Persons = ({ persons }) => {
  return (
    <div>
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

export default Persons