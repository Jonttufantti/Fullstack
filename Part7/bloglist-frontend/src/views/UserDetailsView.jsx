import { useParams } from 'react-router-dom'

const UserDetailsView = ({ blogs }) => {
  const { id } = useParams()

  const userBlogs = blogs.filter(blog => blog.user && blog.user.id === id)
  if (userBlogs.length === 0) {
    return <p>User not found or no blogs.</p>
  }

  const userName = userBlogs[0].user.name

  return (
    <div>
      <h2>{userName}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userBlogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetailsView
