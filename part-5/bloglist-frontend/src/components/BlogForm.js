import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // event handler for create button
  const addBlog = (event) => {
    event.preventDefault()

    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder='enter blog title'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder='enter blog author'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder='enter blog url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm