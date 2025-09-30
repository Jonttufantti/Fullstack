import blogService from '../services/blogs'
import { useState } from 'react'

const BlogForm = ({ onBlogCreated }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = async event => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create(newBlog)
      console.log('Created blog:', createdBlog)
      onBlogCreated(createdBlog)
      setNewBlog({ title: '', author: '', url: '' })
    } catch (error) {
      console.error('Error creating blog', error)
    }
  }

  const handleChange = event => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  return (

    <form onSubmit={addBlog}>
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
