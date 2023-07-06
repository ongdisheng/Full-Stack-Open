// import library
import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [detail, setDetail] = useState(false)

  // event handler for button
  const toggleDetail = () => {
    setDetail(!detail)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetail}>
          { detail ? 'hide' : 'view' }
        </button>
        {
          detail &&
          <div>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}
              <button onClick={handleLike}>like</button>
            </div>
            <div>{blog.user.name}</div>
            {
              user.username === blog.user.username &&
              <button onClick={handleDelete}>remove</button>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Blog