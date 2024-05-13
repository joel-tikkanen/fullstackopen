import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(height, weight);
    res.json({
      weight,
      height,
      bmi,
    });
  }
});

app.get("/exercises", (req, res) => {
    const daily_exercises = req.body.daily_exercises;
    const target = req.body.target;
    
    if (!daily_exercises || !target) {
        res.status(400).json({ error: "parameters missing" });
    } else if (!Array.isArray(daily_exercises) || isNaN(target)) {
        res.status(400).json({ error: "malformatted parameters" });
    } else {
        const result = calculateExercises(daily_exercises, target);
        res.json(result);
    }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
