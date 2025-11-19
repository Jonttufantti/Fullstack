import jwt from "jsonwebtoken";
import errors from "../utils/errors.js";

/**
 * Verifies the access token and, if the token is valid, adds the authenticated
 * user to the request (req.user).
 * */
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(new errors.NotAuthenticatedError());
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new errors.InvalidTokenError());
    req.user = user;
    next();
  });
};

/**
 * Verifies that the ID in request params matches the ID of the authenticated
 * user or that the authenticated user is an admin. Only the authenticated user
 * can, for example, delete their account with the exception of admins.
 * */
export const verifyUserByParam = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      return next(new errors.NotAuthorizedError());
    }
  });
};

/** Verifies admin status */
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(new errors.NotAuthorizedAsAdminError());
    }
  });
};
