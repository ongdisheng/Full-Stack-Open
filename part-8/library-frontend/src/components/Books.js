import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = genre
    ? result.data.allBooks
    : props.books
  const genres = [ ...new Set(props.books.map(book => book.genres).flat()), 'all genres' ]
  
  return (
    <div>
      <h2>books</h2>

      {
        genre && 
        <div>
          in genre <strong>{genre}</strong>
        </div>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        {genres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre === 'all genres' ? null : genre)}>
            {genre}
          </button>
        ))}
      </>
    </div>
  )
}

export default Books
