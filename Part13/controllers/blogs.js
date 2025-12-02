const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const { SECRET } = require("../util/config");
const { tokenExtractor } = require("../util/middleware");

router.get("/", async (req, res, next) => {
  try {
    const where = {};

    if (req.query.search) {
      const keyword = `%${req.query.search}%`;
      where[Op.or] = [
        { title: { [Op.iLike]: keyword } },
        { author: { [Op.iLike]: keyword } },
      ];
    }

    const blogs = await Blog.findAll({
      where,
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
      order: [["likes", "DESC"]],
    });

    console.log(JSON.stringify(blogs, null, 2));
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(blog);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
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

router.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  if (!req.blog) return res.status(404).end();

  if (req.blog.userId !== req.decodedToken.id) {
    return res
      .status(403)
      .json({ error: "only the creator can delete a blog" });
  }

  await req.blog.destroy();
  res.status(204).end();
});

router.patch("/:id", blogFinder, async (req, res, next) => {
  if (!req.blog) return res.status(404).end();

  if (req.blog.userId !== req.decodedToken.id) {
    return res
      .status(403)
      .json({ error: "only the creator can update the blog" });
  }

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
