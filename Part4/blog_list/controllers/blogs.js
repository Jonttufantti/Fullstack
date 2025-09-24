const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    blog ? response.json(blog) : response.status(404).end();
  } catch (error) {
    response.status(400).json({ error: 'malformatted id' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      
      blog.title= title
        blog.author= author
        blog.url= url
        blog.likes= likes

      return blog.save().then((updatedBlog) => {
        response.json(updatedBlog)
      })
    }

    response.status(404).end();
  } catch (error) {
    response.status(400).json({ error: 'malformatted id' });
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id);
    if (blog) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: 'blog not found' });
    }
  } catch (error) {
    response.status(400).json({ error: 'malformatted id' });
  }
});


module.exports = blogsRouter