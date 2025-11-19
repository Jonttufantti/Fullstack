import express from "express";
import { verifyUserByParam } from "../../../middleware/auth.js";
import { getReservations } from "./computerReservations.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/computer-reservations", verifyUserByParam, getReservations);

export default router;
