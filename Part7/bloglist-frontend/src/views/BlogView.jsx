import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCommentToBlog } from '../reducers/blogReducer'

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
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>{blog.likes} likes</div>

      <h3>Comments</h3>
      <ul>{blog.comments && blog.comments.map((c, i) => <li key={i}>{c}</li>)}</ul>

      <form onSubmit={handleCommentSubmit}>
        <input
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  )
}

export default BlogView
