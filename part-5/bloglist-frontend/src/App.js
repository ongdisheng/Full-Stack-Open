// import statements 
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

// app component 
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // retrieve blogs from server
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  // retrieve user from browser local storage 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // event handler for login
  const handleLogin = async event => {
    event.preventDefault()

    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  }

  // event handler for logout
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // event handler for adding blog
  const addBlog = async event => {
    event.preventDefault()

    const blog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  // render login form
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
              type='text'
              value={username}
              name='Username'
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            password
            <input 
              type='password'
              value={password}
              name='Password'
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in 
      <button onClick={handleLogout}>logout</button>

      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input 
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input 
            type='text'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input 
            type='text'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App