import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendation = (props) => {
  const resultUser = useQuery(ME, {
    skip: !props.show
  })
  const resultBooks = useQuery(ALL_BOOKS, {
    skip: !props.show
  })

  if (!props.show) {
    return null
  }

  if (resultUser.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  const favGenre = resultUser.data.me.favoriteGenre 
  const books = resultBooks.data.allBooks.filter(book => book.genres.includes(favGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <strong>{favGenre}</strong></div>

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
    </div>
  )
}

export default Recommendation