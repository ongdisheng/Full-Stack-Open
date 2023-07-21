import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)
  const options = authors.map(author => {
    return { value: author.name, label: author.name }
  })

  const submit = event => {
    event.preventDefault()
    editAuthor({ variables: {name: name.value, setBornTo: Number(born)} })
    setBorn('')
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born
          <input 
            value={born}
            onChange={event => setBorn(event.target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm