import express from "express";
import {
  createComputer,
  updateComputer,
  deleteComputer,
  getComputer,
  getComputers,
} from "./computers.controller.js";
import reservationsRoute from "./reservations/reservations.routes.js";

import { verifyAdmin } from "../../middleware/auth.js";

const router = express.Router();

router.get("/", getComputers);
router.get("/find/:computerId", getComputer);
router.post("/", verifyAdmin, createComputer);
router.put("/:computerId", verifyAdmin, updateComputer);
router.delete("/:computerId", verifyAdmin, deleteComputer);
router.use("/:computerId/reservations", reservationsRoute);

export default router;
