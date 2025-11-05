import { Entry, Diagnosis } from "../types";
import { Typography, Box, Stack } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  const renderDiagnosisCodes = (codes?: string[]) => {
    if (!codes || codes.length === 0) return null;
    return (
      <ul style={{ marginTop: 8, marginBottom: 0 }}>
        {codes.map((code) => {
          const diagnosis = diagnoses.find((d) => d.code === code);
          return (
            <li key={code}>
              <strong>{code}</strong>
              {diagnosis ? ` — ${diagnosis.name}` : ""}
            </li>
          );
        })}
      </ul>
    );
  };

  const Header = ({ children }: { children: React.ReactNode }) => (
    <Typography variant="subtitle1" fontWeight="bold">
      {children}
    </Typography>
  );

  switch (entry.type) {
    case "Hospital":
      return (
        <Box mb={2} p={2} border={1} borderRadius={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Header>{entry.date}</Header>
            <LocalHospitalIcon color="error" />
          </Stack>

          <Typography mt={1}>{entry.description}</Typography>

          <Typography variant="body2" mt={1}>
            Discharge: {entry.discharge.date} — {entry.discharge.criteria}
          </Typography>

          {renderDiagnosisCodes(entry.diagnosisCodes)}
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box mb={2} p={2} border={1} borderRadius={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Header>{entry.date}</Header>
            <WorkIcon color="primary" />
            <Typography variant="body2" color="text.secondary">
              {entry.employerName}
            </Typography>
          </Stack>

          <Typography mt={1}>{entry.description}</Typography>

          {entry.sickLeave && (
            <Typography variant="body2" mt={1}>
              Sick leave: {entry.sickLeave.startDate} —{" "}
              {entry.sickLeave.endDate}
            </Typography>
          )}

          {renderDiagnosisCodes(entry.diagnosisCodes)}
        </Box>
      );

    case "HealthCheck":
      return (
        <Box mb={2} p={2} border={1} borderRadius={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Header>{entry.date}</Header>
            <FavoriteIcon color="success" />
          </Stack>

          <Typography mt={1}>{entry.description}</Typography>

          <Typography variant="body2" mt={1}>
            Health check rating: {entry.healthCheckRating}
          </Typography>

          {renderDiagnosisCodes(entry.diagnosisCodes)}
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
