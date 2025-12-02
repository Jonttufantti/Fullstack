const { Router } = require("express");
const { Blog } = require("../models");
const { Sequelize } = require("sequelize");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "articles"],
        [Sequelize.fn("SUM", Sequelize.col("likes")), "likes"],
      ],
      group: ["author"],
      order: [[Sequelize.fn("SUM", Sequelize.col("likes")), "DESC"]], // bonus: order by likes
    });

    res.json(authors);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
