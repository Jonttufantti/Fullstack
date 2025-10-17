import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/notification'
import Togglable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { showNotificationFor } from './reducers/notificationReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notifications)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      await dispatch(createBlog(blogObject))
      dispatch(showNotificationFor('Blog has successfully been created', 'success'))
    } catch (error) {
      dispatch(showNotificationFor('Error creating blog', 'error'))
    }
  }

  const likeBlog = async blogObject => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, {
        ...blogObject,
        likes: blogObject.likes + 1
      })
      setBlogs(prevBlogs =>
        prevBlogs
          .map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
          .sort((a, b) => b.likes - a.likes)
      )
      dispatch(showNotificationFor(`You liked a blog ${updatedBlog.title}`, 'success'))
    } catch (error) {
      dispatch(showNotificationFor('Error liking the blog', 'error'))
      console.error(error)
    }
  }

  const deleteBlog = async blogObject => {
    try {
      await blogService.remove(blogObject.id)
      setBlogs(prevBlogs =>
        prevBlogs.filter(blog => blog.id !== blogObject.id).sort((a, b) => b.likes - a.likes)
      )
      dispatch(showNotificationFor(`You removed a blog ${blogObject.title}`, 'success'))
    } catch (error) {
      dispatch(showNotificationFor('Encountered an error while removing the blog', 'error'))
      console.error(error)
    }
  }

  const handleLogin = user => {
    setUser(user)

    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    dispatch(showNotificationFor(`${user.username} has successfully logged in`, 'success'))
    console.log('Logged in:', user)
  }

  const handleFail = () => {
    dispatch(showNotificationFor('Wrong username or password', 'error'))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <div>
      {!user ? <h2>log in to the application</h2> : <h2>blogs</h2>}

      <Notification notification={notification} />

      <Togglable buttonLabel="login">
        {!user && <LoginForm onLogin={handleLogin} failedLogin={handleFail} />}
      </Togglable>
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm onBlogCreated={addBlog} />
          </Togglable>

          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
