import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommend = (props) => {
  const result = useQuery(ME)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const favGenre = result.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <strong>{favGenre}</strong></div>
    </div>
  )
}

export default Recommend