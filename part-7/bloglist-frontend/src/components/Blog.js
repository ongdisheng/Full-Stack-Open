import { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, updateLike, deleteBlog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    blogService.addComment(blog.id, { comment }).then((blog) => {
      dispatch(updateBlog({ id: blog.id, updatedBlog: blog }))
    })
    setComment('')
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={`${blog.url}`}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => updateLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user.name === blog.user.name && (
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
      )}
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
