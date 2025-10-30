import express from "express";
import { calculateBmi } from "./calculateBmi";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
const PORT = 3003;
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  const body: any = req.body;

  if (!body.daily_exercises || body.target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const dailyExercises = body.daily_exercises;
  const target = body.target;

  if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((e) => typeof e !== "number") ||
    typeof target !== "number"
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(target, dailyExercises);

  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
