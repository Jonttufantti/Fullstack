import express from "express";
import { calculateBmi } from "./calculateBmi";

const app = express();
const PORT = 3003;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
