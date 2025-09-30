import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      }
    }

    fetchBlogs()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = (user) => {
    setUser(user)
    console.log("Logged in:", user)
  }


  return (
    <div>
      {!user && <LoginForm onLogin={handleLogin} />}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => {
            window.localStorage.removeItem('loggedBlogUser')
            setUser(null)
          }}>
            logout
          </button>

          <BlogForm onBlogCreated={(createdBlog) => setBlogs(blogs.concat(createdBlog))} />

          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App