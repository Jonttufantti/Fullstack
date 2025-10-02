import { useState } from "react"

const Blog = ({ blog, likeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [details, setDetails] = useState(false)

  const viewDetails = { display: details ? '' : 'none' }

  const toggleDetails = () => {
    setDetails(!details)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{details ? 'Hide' : 'View'}</button>
      </div>
      <div style={viewDetails}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={() => likeBlog(blog)} >like</button>
        </div>
        <div>{blog.user?.name}</div>
      </div>
    </div>
  )
}


export default Blog