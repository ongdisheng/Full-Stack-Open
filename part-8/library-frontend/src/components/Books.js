import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show
  })

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      const books = result.data.allBooks
      setGenres([...new Set(books?.flatMap(book => book.genres)), 'all genres'])
      const booksByGenre = genre 
        ? books.filter(book => book.genres.includes(genre))
        : books
      setBooks(booksByGenre)
    }
  }, [result.data, genre])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  const handleClick = genre => {
    const selectedGenre = genre === 'all genres'
      ? null 
      : genre
    setGenre(selectedGenre)
  }

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
          <button key={genre} onClick={() => handleClick(genre)}>
            {genre}
          </button>
        ))}
      </>
    </div>
  )
}

export default Books
