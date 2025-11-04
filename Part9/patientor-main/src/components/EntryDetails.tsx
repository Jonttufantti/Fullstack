import {
  Patient,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../types";
import { Typography, Box } from "@mui/material";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box mb={2} p={1} border={1} borderRadius={2}>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Type: Hospital</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
          {entry.diagnosisCodes && (
            <Typography>
              Diagnosis Codes: {entry.diagnosisCodes.join(", ")}
            </Typography>
          )}
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box mb={2} p={1} border={1} borderRadius={2}>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Type: Occupational Healthcare</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Employer: {entry.employerName}</Typography>
          {entry.sickLeave && (
            <Typography>
              Sick Leave: {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </Typography>
          )}
          {entry.diagnosisCodes && (
            <Typography>
              Diagnosis Codes: {entry.diagnosisCodes.join(", ")}
            </Typography>
          )}
        </Box>
      );
    case "HealthCheck":
      return (
        <Box mb={2} p={1} border={1} borderRadius={2}>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Type: Health Check</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>Rating: {entry.healthCheckRating}</Typography>
          {entry.diagnosisCodes && (
            <Typography>
              Diagnosis Codes: {entry.diagnosisCodes.join(", ")}
            </Typography>
          )}
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

function assertNever(value: never): never {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
}

export default EntryDetails;
