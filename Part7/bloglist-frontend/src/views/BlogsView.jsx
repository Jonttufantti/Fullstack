import { Box, Typography, Button, Stack, Divider, Card, CardContent } from '@mui/material'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Toggable'

const BlogsView = ({ blogs, addBlog, handleLike, handleDelete, user, blogFormRef }) => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Blogs
      </Typography>

      <Card sx={{ mb: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm onBlogCreated={addBlog} />
        </Togglable>
      </Card>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {blogs.map(blog => (
          <Card key={blog.id} sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              <Blog
                blog={blog}
                handleLike={() => handleLike(blog)}
                handleRemove={() => handleDelete(blog)}
                user={user}
              />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

export default BlogsView
