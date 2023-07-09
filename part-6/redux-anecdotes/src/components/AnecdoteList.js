// import statements
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>
          vote
        </button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  // filter list
  // order by number of votes
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(a => a.content.includes(filter))
      .sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => dispatch(incrementVote(anecdote.id))}
        />
      )}
    </>
  )
}

export default AnecdoteList