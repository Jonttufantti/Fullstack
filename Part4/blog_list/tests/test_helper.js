const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "First test blog",
    author: "Tester",
    url: "http://test.com/1",
    likes: 5
  },
  {
    title: "Second test blog",
    author: "Tester2",
    url: "http://test.com/2",
    likes: 10
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'willremovethissoon',
    author: "Tester3",
    url: "http://test.com/3",
    likes: 20 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}