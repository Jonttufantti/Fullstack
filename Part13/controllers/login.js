// controllers/login.js
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { SECRET } = require("../util/config");

router.post("/", async (request, response) => {
  // Import models inside the route to avoid circular dependency
  const { User, Session } = require("../models");

  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  if (user.disabled) {
    return response.status(401).json({
      error: "account disabled, please contact admin",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  // Store the session in the database
  await Session.create({
    userId: user.id,
    token,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
