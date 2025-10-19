import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material'

const UsersView = ({ blogs }) => {
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
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link
                    to={`/users/${user.id}`}
                    style={{ textDecoration: 'none', color: '#1976d2' }}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UsersView
