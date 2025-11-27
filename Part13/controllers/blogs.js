const router = require("express").Router();
const { Blog } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    console.log(JSON.stringify(blogs, null, 2));
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (err) {
    next(err);
  }
};

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    console.log(req.blog.toJSON());
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", blogFinder, async (req, res, next) => {
  if (req.blog) {
    try {
      await req.blog.destroy();
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  } else res.status(404).end();
});

router.patch("/:id", blogFinder, async (req, res, next) => {
  if (!req.blog) return res.status(404).end();

  const allowedFields = ["title", "author", "url", "likes"];
  const updatedFields = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updatedFields[field] = req.body[field];
  });

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  try {
    await req.blog.update(updatedFields);
    res.json(req.blog);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
