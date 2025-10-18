import { Link } from 'react-router-dom'

const UsersView = ({ blogs }) => {
  // Group blogs by user
  const usersMap = new Map()

  blogs.forEach(blog => {
    if (blog.user) {
      const userId = blog.user.id
      if (!usersMap.has(userId)) {
        usersMap.set(userId, { name: blog.user.name, id: userId, blogs: [] })
      }
      usersMap.get(userId).blogs.push(blog)
    }
  })

  const users = Array.from(usersMap.values())

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
