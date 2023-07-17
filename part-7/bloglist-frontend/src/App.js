// import statements
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createNotification,
  clearNotification,
} from './reducers/notificationReducer'
import {
  initializeBlogs,
  appendBlog,
  removeBlog,
  updateBlog,
} from './reducers/blogReducer'
import { clearUser, setUser } from './reducers/userReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { Routes, Route, useMatch } from 'react-router-dom'

const Blogs = ({
  blogFormRef,
  createBlog,
  blogs,
  user,
  updateLike,
  deleteBlog,
}) => {
  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={() => updateLike(blog.id)}
          handleDelete={() => deleteBlog(blog.id)}
        />
      ))}
    </>
  )
}

// app component
const App = () => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  )
  const user = useSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  // define blog form reference object
  const blogFormRef = useRef()

  // retrieve blogs added by a specific user
  const match = useMatch('/users/:id')
  const userBlogs = match
    ? users.find((user) => user.id === match.params.id)
    : null

  // retrieve users from server
  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  // retrieve blogs from server
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // retrieve user from browser local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  // event handler for login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  // event handler for logout
  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(clearUser())
  }

  // event handler for update like
  const updateLike = (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const newBlog = { ...blog, likes: blog.likes + 1 }

    blogService.update(id, newBlog).then((updatedBlog) => {
      dispatch(updateBlog({ id, updatedBlog }))
    })
  }

  // event handler for deleting blog
  const deleteBlog = (id) => {
    const blog = blogs.find((blog) => blog.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(id).then(() => {
        dispatch(removeBlog(id))
      })
    }
  }

  // event handler for creating blog
  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        dispatch(appendBlog({ ...returnedBlog, user }))
        dispatch(
          createNotification(
            `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
          )
        )

        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      })
      .catch(() => {
        dispatch(createNotification('invalid blog'))

        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      })
  }

  // render login form
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route
          path="/"
          element={
            <Blogs
              blogFormRef={blogFormRef}
              createBlog={createBlog}
              blogs={blogs}
              user={user}
              updateLike={updateLike}
              deleteBlog={deleteBlog}
            />
          }
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={userBlogs} />} />
      </Routes>
    </div>
  )
}

export default App
