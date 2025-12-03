// controllers/logout.js
const router = require("express").Router();
const { tokenExtractor } = require("../util/middleware");

router.delete("/", tokenExtractor, async (req, res) => {
  // Import models inside the route to avoid circular dependency
  const { Session } = require("../models");

  // Delete the session from the database
  await Session.destroy({
    where: {
      token: req.token,
    },
  });

  res.status(204).end();
});

module.exports = router;
