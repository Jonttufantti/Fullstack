import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCommentToBlog } from '../reducers/blogReducer'
import { Button, TextField, Typography, Card, CardContent, List, ListItem } from '@mui/material'

const BlogView = ({ blog }) => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()

  if (!blog) return null

  const handleCommentSubmit = async event => {
    event.preventDefault()
    if (!newComment) return

    dispatch(addCommentToBlog(blog.id, newComment))
    setNewComment('')
  }

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5">{blog.title}</Typography>
        <Typography color="text.secondary">{blog.author}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {blog.url}
        </Typography>
        <Typography sx={{ mt: 1 }}>{blog.likes} likes</Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Comments
        </Typography>
        <List>
          {blog.comments?.map((c, i) => (
            <ListItem key={i}>{c}</ListItem>
          ))}
        </List>

        <form onSubmit={handleCommentSubmit}>
          <TextField
            label="Add a comment"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Add Comment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default BlogView
