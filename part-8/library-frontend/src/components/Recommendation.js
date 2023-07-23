import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommendation = (props) => {
  const result = useQuery(ME, {
    skip: !props.show
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const favGenre = result.data.me.favoriteGenre 
  const books = props.books.filter(book => book.genres.includes(favGenre))

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