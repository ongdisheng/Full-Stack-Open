import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

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
      
      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm 
        show={page === 'login'} 
        setPage={setPage}
        setToken={setToken} 
      />

      <Recommendation show={page === 'recommend'} />

    </div>
  )
}

export default App
