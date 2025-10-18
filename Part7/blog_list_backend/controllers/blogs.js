const blogsRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  const user = request.user;
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    blog ? response.json(blog) : response.status(404).end();
  } catch (error) {
    response.status(400).json({ error: "malformatted id" });
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      blog.title = title;
      blog.author = author;
      blog.url = url;
      blog.likes = likes;

      const updatedBlog = await blog.save();
      await updatedBlog.populate("user", { username: 1, name: 1 });

      return response.json(updatedBlog);
    }

    response.status(404).end();
  } catch (error) {
    response.status(400).json({ error: "malformatted id" });
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blogId = request.params.id;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: "unauthorized action" });
  }

  await Blog.findByIdAndDelete(blogId);
  response.status(204).end();
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);

  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  blog.comments = blog.comments.concat(comment);
  const updatedBlog = await blog.save();
  response.status(201).json(updatedBlog);
});

module.exports = blogsRouter;
