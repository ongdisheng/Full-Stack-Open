import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (page !== 'authors' && page !== 'books') {
      setPage('authors')
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token &&
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </>
        }
        {
          !token &&
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        }
      </div>

      <Authors show={page === 'authors'} />
      
      {
        !result.loading &&
        <Books show={page === 'books'} books={result.data.allBooks} />
      }

      <NewBook show={page === 'add'} />

      <LoginForm 
        show={page === 'login'} 
        setPage={setPage}
        setToken={setToken} 
      />

      {
        !result.loading &&
        <Recommendation 
          show={page === 'recommend'}
          books={result.data.allBooks}
        />
      }
    </div>
  )
}

export default App
