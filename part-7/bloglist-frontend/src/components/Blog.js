const Blog = ({ blog, user, updateLike, deleteBlog }) => {
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={`${blog.url}`}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => updateLike(blog.id)}>like</button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      {
        user.name === blog.user.name &&
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
      }
    </div>
  )
}

export default Blog
