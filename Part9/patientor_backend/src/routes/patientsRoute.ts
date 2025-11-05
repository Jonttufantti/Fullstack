import express from "express";
import patientsService from "../services/patientsService";
import { z } from "zod";
import { NewPatientSchema, EntryWithoutId } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientsService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    return res.send(patient);
  }
  return res.sendStatus(404);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = NewPatientSchema.parse(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    return res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ error: error.issues });
    }
    return res.status(400).send({ error: "unknown error" });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patientId = req.params.id;
    const entryData: EntryWithoutId = req.body;

    const addedEntry = patientsService.addEntry(patientId, entryData);
    if (!addedEntry) {
      return res.status(404).send({ error: "Patient not found" });
    }

    return res.json(addedEntry);
  } catch (error: unknown) {
    return res.status(400).send({ error: "Invalid entry data" });
  }
});

export default router;
