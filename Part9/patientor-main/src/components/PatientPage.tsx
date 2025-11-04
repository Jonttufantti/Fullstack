import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from "../services/patients";
import { Typography, CircularProgress } from "@mui/material";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const data = await patientService.getById(id);
        setPatient(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    void fetchPatient();
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
          <EntryDetails key={entry.id} entry={entry} />
        ))
      )}
    </div>
  );
};

export default PatientPage;
