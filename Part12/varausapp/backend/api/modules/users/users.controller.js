import userService from "./users.service.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.update(req.params.userId, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await userService.remove(req.params.userId);
    res.status(200).json("Computer deleted");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
