import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./users.controller.js";
import computerReservationsRoute from "./computerReservations/computerReservation.routes.js";
import {
  verifyAdmin,
  verifyToken,
  verifyUserByParam,
} from "../../middleware/auth.js";

const router = express.Router();

// Check for cookie (testing purposes)
// eslint-disable-next-line no-unused-vars
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("You are logged in.");
});
// Check if user id matches user for account deletion purposes (testing
// purposes).
// eslint-disable-next-line no-unused-vars
router.get("/checkuser/:userId", verifyUserByParam, (req, res, next) => {
  res.send("You are verified for deleting your account");
});
// Check if user is admin (testing purposes)
// eslint-disable-next-line no-unused-vars
router.get("/checkadmin/:userId", verifyAdmin, (req, res, next) => {
  res.send("You are logged in and can start managing accounts");
});

router.get("/", verifyAdmin, getUsers);
router.get("/:userId", verifyUserByParam, getUser);
router.put("/:userId", verifyUserByParam, updateUser);
router.delete("/:userId", verifyUserByParam, deleteUser);
router.use("/:userId/computer-reservations", computerReservationsRoute);

export default router;
