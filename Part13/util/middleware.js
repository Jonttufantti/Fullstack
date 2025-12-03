// util/middleware.js
const jwt = require("jsonwebtoken");
const { SECRET } = require("./config.js");

const tokenExtractor = async (req, res, next) => {
  // Import models inside the function to avoid circular dependency
  const { Session, User } = require("../models");

  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);

    try {
      // Verify the JWT token
      req.decodedToken = jwt.verify(token, SECRET);

      // Check if the session exists in the database
      const session = await Session.findOne({
        where: { token },
      });

      if (!session) {
        return res.status(401).json({ error: "session expired or invalid" });
      }

      // Check if the user is disabled
      const user = await User.findByPk(req.decodedToken.id);

      if (!user) {
        return res.status(401).json({ error: "user not found" });
      }

      if (user.disabled) {
        return res.status(401).json({
          error: "account disabled, please contact admin",
        });
      }

      // Store the token for logout
      req.token = token;
    } catch (error) {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }

  next();
};

module.exports = { tokenExtractor };
