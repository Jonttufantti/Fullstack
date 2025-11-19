import express from "express";
import { getMyComputerReservations } from "./me.controller.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.get("/computer-reservations", verifyToken, getMyComputerReservations);

export default router;
