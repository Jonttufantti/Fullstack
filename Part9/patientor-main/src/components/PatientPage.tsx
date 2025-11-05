import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../types";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import { Typography, CircularProgress } from "@mui/material";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [patientData, diagnosisData] = await Promise.all([
          patientService.getById(id),
          diagnosesService.getAll(),
        ]);
        setPatient(patientData);
        setDiagnoses(diagnosisData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!patient) return <p>Patient not found</p>;

  return (
    <div>
      <Typography variant="h4">{patient.name}</Typography>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>

      <Typography variant="h6">Entries</Typography>
      {patient.entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}
    </div>
  );
};

export default PatientPage;
