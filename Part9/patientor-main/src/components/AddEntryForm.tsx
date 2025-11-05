import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Entry, EntryWithoutId, Diagnosis } from "../types";
import patientService from "../services/patients";

interface Props {
  patientId: string;
  onEntryAdded: (entry: Entry) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ patientId, onEntryAdded, diagnoses }: Props) => {
  const [formData, setFormData] = useState({
    date: "",
    type: "HealthCheck",
    description: "",
    specialist: "",
    diagnosisCodes: [] as string[],
    healthCheckRating: "0",
    dischargeDate: "",
    dischargeCriteria: "",
    employerName: "",
    sickLeaveStart: "",
    sickLeaveEnd: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      let entryData: EntryWithoutId;

      switch (formData.type) {
        case "HealthCheck":
          entryData = {
            date: formData.date,
            type: "HealthCheck",
            description: formData.description,
            specialist: formData.specialist,
            diagnosisCodes:
              formData.diagnosisCodes.length > 0
                ? formData.diagnosisCodes
                : undefined,
            healthCheckRating: Number(formData.healthCheckRating) as
              | 0
              | 1
              | 2
              | 3,
          };
          break;

        case "Hospital":
          entryData = {
            date: formData.date,
            type: "Hospital",
            description: formData.description,
            specialist: formData.specialist,
            diagnosisCodes:
              formData.diagnosisCodes.length > 0
                ? formData.diagnosisCodes
                : undefined,
            discharge: {
              date: formData.dischargeDate,
              criteria: formData.dischargeCriteria,
            },
          };
          break;

        case "OccupationalHealthcare":
          entryData = {
            date: formData.date,
            type: "OccupationalHealthcare",
            description: formData.description,
            specialist: formData.specialist,
            diagnosisCodes:
              formData.diagnosisCodes.length > 0
                ? formData.diagnosisCodes
                : undefined,
            employerName: formData.employerName,
            sickLeave:
              formData.sickLeaveStart && formData.sickLeaveEnd
                ? {
                    startDate: formData.sickLeaveStart,
                    endDate: formData.sickLeaveEnd,
                  }
                : undefined,
          };
          break;

        default:
          throw new Error("Unknown entry type");
      }

      const newEntry = await patientService.addEntry(patientId, entryData);
      onEntryAdded(newEntry);

      setFormData({
        date: "",
        type: "HealthCheck",
        description: "",
        specialist: "",
        diagnosisCodes: [] as string[],
        healthCheckRating: "0",
        dischargeDate: "",
        dischargeCriteria: "",
        employerName: "",
        sickLeaveStart: "",
        sickLeaveEnd: "",
      });
    } catch (err) {
      setError("Invalid entry data. Check your inputs.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <h3>Add new entry</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TextField
        type="date"
        name="date"
        label="Date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        margin="dense"
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        select
        name="type"
        label="Type"
        value={formData.type}
        onChange={handleChange}
        fullWidth
        margin="dense"
      >
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          Occupational Healthcare
        </MenuItem>
      </TextField>
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        name="specialist"
        label="Specialist"
        value={formData.specialist}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <FormControl fullWidth margin="dense">
        <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          multiple
          name="diagnosisCodes"
          value={formData.diagnosisCodes}
          onChange={(e) =>
            setFormData({
              ...formData,
              diagnosisCodes: e.target.value as string[],
            })
          }
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {diagnoses.map((d: Diagnosis) => (
            <MenuItem key={d.code} value={d.code}>
              <Checkbox checked={formData.diagnosisCodes.includes(d.code)} />
              <ListItemText primary={`${d.code} ${d.name}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {formData.type === "HealthCheck" && (
        <TextField
          select
          name="healthCheckRating"
          label="Health Check Rating"
          value={formData.healthCheckRating}
          onChange={handleChange}
          fullWidth
          margin="dense"
        >
          <MenuItem value="0">0 - Healthy</MenuItem>
          <MenuItem value="1">1 - Low Risk</MenuItem>
          <MenuItem value="2">2 - High Risk</MenuItem>
          <MenuItem value="3">3 - Critical Risk</MenuItem>
        </TextField>
      )}

      {formData.type === "Hospital" && (
        <>
          <TextField
            type="date"
            name="dischargeDate"
            label="Discharge date"
            value={formData.dischargeDate}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="dischargeCriteria"
            label="Discharge criteria"
            value={formData.dischargeCriteria}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </>
      )}

      {formData.type === "OccupationalHealthcare" && (
        <>
          <TextField
            name="employerName"
            label="Employer name"
            value={formData.employerName}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            type="date"
            name="sickLeaveStart"
            label="Sick leave start"
            value={formData.sickLeaveStart}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            name="sickLeaveEnd"
            label="Sick leave end"
            value={formData.sickLeaveEnd}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  );
};

export default AddEntryForm;
