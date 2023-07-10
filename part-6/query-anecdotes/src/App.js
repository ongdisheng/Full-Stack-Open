import { useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  // retrieve data from server
  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: false
    }
  )
  console.log(result)

  // in the process of loading data from server
  if (result.isLoading) {
    return <div>Loading...</div>
  }

  // error connecting with server
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
