// import statements 
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

// app component 
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  // define blog form reference object
  const blogFormRef = useRef() 

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

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // event handler for logout
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // event handler for update like
  const updateLike = id => {
    const blog = blogs.find(blog => blog.id === id)
    const newBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, newBlog)
      .then(updatedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
      })
  }

  // event handler for creating blog
  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat({ ...returnedBlog, user }))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage('invalid blog')

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  // render login form
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification 
          message={message}
        />
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
      <Notification 
        message={message}
      />
      {user.name} logged in 
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm 
          createBlog={createBlog}
        />
      </Togglable>
      
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          handleLike={() => updateLike(blog.id)}
        />
      )}
    </div>
  )
}

export default App