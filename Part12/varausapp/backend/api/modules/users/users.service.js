import User from "./user.js";

// TODO: throw an error (using errors from utils/errors.js) if a user
// doesn't exist.

const update = async (id, { username, email, password, isAdmin }) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: { username, email, password, isAdmin } },
    { new: true }
  );
  return updatedUser;
};

const remove = async (id) => {
  await User.findByIdAndDelete(id);
};

const getById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const getAll = async () => {
  const users = await User.find();
  return users;
};

const userService = {
  update,
  remove,
  getById,
  getAll,
};

export default userService;
