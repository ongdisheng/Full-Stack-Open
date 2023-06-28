// import library
import { useState } from 'react'

const Blog = ({ blog }) => {
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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button onClick={toggleDetail}>
          { detail ? 'hide' : 'view' }
        </button>
        {
          detail &&
          <div>
            <div>{blog.url}</div>
            <div>likes {blog.likes} <button>like</button></div>
            <div>{blog.author}</div>
          </div>
        }
      </div>
    </div>
  )
}

export default Blog