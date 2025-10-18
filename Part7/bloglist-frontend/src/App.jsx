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
import { setUser, clearUser } from './reducers/userReducer'
import { Routes, Route, Link, useParams, useNavigate, useMatch } from 'react-router-dom'
import UsersView from './views/UsersView'
import UserDetailsView from './views/UserDetailsView'
import BlogsView from './views/BlogsView'
import BlogView from './views/BlogView'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notifications)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const padding = {
    padding: 5
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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
    dispatch(setUser(user))
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    dispatch(showNotificationFor(`${user.username} has successfully logged in`, 'success'))
  }

  const handleFail = () => {
    dispatch(showNotificationFor('Wrong username or password', 'error'))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(clearUser())
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  const Home = () => (
    <div>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </p>
    </div>
  )

  return (
    <div>
      {!user ? (
        <div>
          <h2>log in to the application</h2>
          <Togglable buttonLabel="login">
            {!user && <LoginForm onLogin={handleLogin} failedLogin={handleFail} />}
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>Blog list application</h2>
          <Notification notification={notification} />
          {user && (
            <div>
              <p>{user.name} logged in</p>
              <button onClick={handleLogout}>logout</button>
            </div>
          )}

          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/blogs">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>

          <Routes>
            <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
            <Route
              path="/blogs"
              element={
                <BlogsView
                  blogs={blogs}
                  addBlog={addBlog}
                  handleLike={handleLike}
                  handleDelete={handleDelete}
                  user={user}
                  blogFormRef={blogFormRef}
                />
              }
            />
            <Route path="/users" element={<UsersView blogs={blogs} />} />
            <Route path="/users/:id" element={<UserDetailsView blogs={blogs} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
