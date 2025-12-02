const router = require("express").Router();
const { ReadingList, User, Blog } = require("../models");
const { tokenExtractor } = require("../util/middleware");

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const { blogId, userId } = req.body;

    if (req.decodedToken.id !== userId) {
      return res.status(403).json({
        error: "you can only add blogs to your own reading list",
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    const readingListEntry = await ReadingList.create({
      userId,
      blogId,
      read: false,
    });

    res.json(readingListEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
