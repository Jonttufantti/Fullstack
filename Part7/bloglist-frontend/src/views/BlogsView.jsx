import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Toggable'

const BlogsView = ({ blogs, addBlog, handleLike, handleDelete, user, blogFormRef }) => {
  return (
    <div>
      <h2>Blogs</h2>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onBlogCreated={addBlog} />
      </Togglable>

      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Blog
              blog={blog}
              handleLike={() => handleLike(blog)}
              handleRemove={() => handleDelete(blog)}
              user={user}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogsView
