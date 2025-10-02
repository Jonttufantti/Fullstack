import { useState } from 'react'

const BlogForm = ({ onBlogCreated }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })


    const handleSubmit = event => {
    event.preventDefault()
    onBlogCreated(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleChange = event => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  return (

    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={newBlog.title}
        onChange={handleChange}
        required
        placeholder='Enter title'
      />
      <input
        name="author"
        value={newBlog.author}
        onChange={handleChange}
        required
        placeholder='Enter author'
      />
      <input
        name="url"
        value={newBlog.url}
        onChange={handleChange}
        required
        placeholder='Enter url'
      />
      <button type="submit">save</button>
    </form>

  )
}

export default BlogForm
