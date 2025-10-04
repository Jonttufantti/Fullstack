import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemove(blog)
    }
  }

  return (
    <div className="blog" data-testid="blog-container" style={{ paddingTop: 10, paddingLeft: 2, border: 1, marginBottom: 5 }}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      </div>

      {visible && (
        <div className="blogDetails">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button onClick={removeBlog}>Remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
