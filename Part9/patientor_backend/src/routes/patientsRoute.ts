import express from "express";
import patientsService from "../services/patientsService";
import { z } from "zod";
import { NewPatientSchema } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = NewPatientSchema.parse(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
