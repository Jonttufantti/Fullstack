import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ text: null, type: null })


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
    setNotification({ text: `${user.username} has succsefully logged in`, type: 'success' })
    setTimeout(() => {
      setNotification({ text: null, type: null })
    }, 5000)
    console.log("Logged in:", user)
  }

  const handleFail = () => {
    setNotification({ text: `Wrong username or password`, type: 'error' })
    setTimeout(() => {
      setNotification({ text: null, type: null })
    }, 5000)
  }


  return (
    <div>
      {!user ? <h2>log in to the application</h2> : <h2>blogs</h2>}

      <Notification notification={notification} />

      {!user && <LoginForm onLogin={handleLogin} failedLogin={handleFail} />}

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

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App