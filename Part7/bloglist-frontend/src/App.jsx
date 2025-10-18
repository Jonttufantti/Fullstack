import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/notification'
import Togglable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
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

  const handleLike = async blog => {
    try {
      await dispatch(likeBlog(blog))
      dispatch(showNotificationFor(`You liked blog "${blog.title}"`, 'success'))
    } catch {
      dispatch(showNotificationFor('Error liking blog', 'error'))
    }
  }

  const handleDelete = async blog => {
    try {
      await dispatch(deleteBlog(blog.id))
      dispatch(showNotificationFor(`Deleted blog "${blog.title}"`, 'success'))
    } catch {
      dispatch(showNotificationFor('Error deleting blog', 'error'))
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
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => handleLike(blog)}
              handleRemove={() => handleDelete(blog)}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
