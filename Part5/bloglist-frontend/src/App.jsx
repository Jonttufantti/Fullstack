import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/notification'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ text: null, type: null })

  const blogFormRef = useRef()

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

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blogObject)
      console.log('Created blog:', createdBlog)
      setBlogs(prevBlogs =>
        [...prevBlogs, createdBlog].sort((a, b) => b.likes - a.likes)
      )
      setNotification({ text: 'Blog has successfully been created', type: 'success' })
      setTimeout(() => {
        setNotification({ text: null, type: null })
      }, 5000)
    } catch (error) {
      console.error('Error creating blog', error)
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, {
        ...blogObject,
        likes: blogObject.likes + 1
      })
      setBlogs(prevBlogs =>
        prevBlogs
          .map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
          .sort((a, b) => b.likes - a.likes)
      )
      setNotification({ text: `You liked a blog ${updatedBlog.title}`, type: 'success' })
      setTimeout(() => {
        setNotification({ text: null, type: null })
      }, 5000)
    } catch (error) {
      setNotification({ text: 'Error liking the blog', type: 'error' })
      setTimeout(() => {
        setNotification({ text: null, type: null })
      }, 5000)
      console.error(error)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)
      setBlogs(prevBlogs =>
        prevBlogs
          .filter(blog => blog.id !== blogObject.id)
          .sort((a, b) => b.likes - a.likes)
      )
      setNotification({ text: `You removed a blog ${blogObject.title}`, type: 'success' })
      setTimeout(() => {
        setNotification({ text: null, type: null })
      }, 5000)
    } catch (error) {
      setNotification({ text: 'Encountered an error while removing the blog', type: 'error' })
      setTimeout(() => {
        setNotification({ text: null, type: null })
      }, 5000)
      console.error(error)
    }
  }

  const handleLogin = (user) => {
    setUser(user)
    setNotification({ text: `${user.username} has successfully logged in`, type: 'success' })
    setTimeout(() => {
      setNotification({ text: null, type: null })
    }, 5000)
    console.log('Logged in:', user)
  }

  const handleFail = () => {
    setNotification({ text: 'Wrong username or password', type: 'error' })
    setTimeout(() => {
      setNotification({ text: null, type: null })
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }


  return (
    <div>
      {!user ? <h2>log in to the application</h2> : <h2>blogs</h2>}

      <Notification notification={notification} />

      <Togglable buttonLabel='login'>
        {!user && <LoginForm onLogin={handleLogin} failedLogin={handleFail} />}
      </Togglable>
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>
            logout
          </button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm onBlogCreated={addBlog} />
          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={likeBlog} handleRemove={deleteBlog} user={user} />
          )}
        </div>
      )}
    </div>
  )
}

export default App