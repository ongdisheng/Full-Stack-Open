import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setPage, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  const handleLogin = event => {
    event.preventDefault()
    login({ variables: {username, password} })
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setPage('authors')
      setToken(token)
      localStorage.setItem('token', token)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          name 
          <input
            value={username}
            onChange={event => setUsername(event.target.value)}
          /> 
        </div>
        <div>
          password
          <input
            value={password}
            type='password'
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm