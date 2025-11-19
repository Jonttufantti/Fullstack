import express from "express";
import {
  createReservation,
  deleteReservation,
  getReservation,
  getReservations,
} from "./reservations.controller.js";
import { verifyToken } from "../../../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.get("/", verifyToken, getReservations);
router.get("/:reservationId", verifyToken, getReservation);
router.post("/", verifyToken, createReservation);
router.delete("/:reservationId", verifyToken, deleteReservation);

export default router;
