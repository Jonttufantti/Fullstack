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

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const readingListEntry = await ReadingList.findByPk(req.params.id);

    if (!readingListEntry) {
      return res.status(404).json({ error: "reading list entry not found" });
    }

    if (readingListEntry.userId !== req.decodedToken.id) {
      return res.status(403).json({
        error: "you can only mark blogs in your own reading list as read",
      });
    }

    if (typeof req.body.read !== "boolean") {
      return res.status(400).json({
        error: "read status must be a boolean value",
      });
    }

    readingListEntry.read = req.body.read;
    await readingListEntry.save();

    res.json(readingListEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
