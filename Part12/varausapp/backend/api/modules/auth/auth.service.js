import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../users/user.js";
import errors from "../../utils/errors.js";

/** Register service with bcryptjs to hash the password. */
const register = async ({ username, email, password, isAdmin }) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username: username,
    email: email,
    password: hash,
    isAdmin: isAdmin,
  });

  await newUser.save();
};

/**
 * Login service with bcryptjs compare function and JWT for authentication.
 */
const login = async ({ username, password }) => {
  const user = await User.findOne({ username: username }, null, { lean: true });

  if (!user) {
    throw new errors.NotFoundError("User");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    throw new errors.ValidationError("Wrong password or username");
  }

  // Checks for the user id and checks if they are admin so no one else can get
  // it except the specific user which will be set to your cookies using JWT
  // and cookie-parser package

  // NOTE: No expiration time for access token. Authentication and database
  // should be unified with Project Gate in the future, so better not spend
  // time on authentication for now.

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );

  return {
    user: {
      username: user.username,
      email: user.email,
      id: user._id.toString(),
    },
    token,
  };
};

const authService = {
  register,
  login,
};

export default authService;
