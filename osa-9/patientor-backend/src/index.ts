import express from "express";
import cors from "cors";
import diaryRouter from "./routes/diaries";
import diagnosisRouter from "./routes/diagnoses";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.use("/api/diagnoses", diagnosisRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
