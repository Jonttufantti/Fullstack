import { useParams } from 'react-router-dom'
import { Typography, List, ListItem, ListItemText, Box, Paper } from '@mui/material'

const UserDetailsView = ({ blogs }) => {
  const { id } = useParams()
  const userBlogs = blogs.filter(blog => blog.user && blog.user.id === id)

  if (userBlogs.length === 0) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant="h6">User not found or no blogs.</Typography>
      </Box>
    )
  }

  const userName = userBlogs[0].user.name

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        {userName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Added blogs
      </Typography>
      <Paper sx={{ p: 2, boxShadow: 3 }}>
        <List>
          {userBlogs.map(blog => (
            <ListItem key={blog.id}>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default UserDetailsView
