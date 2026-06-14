import express from "express";
import jobRoutes from "./routes/job.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Job service is running" });
});

app.use("/api/job", jobRoutes);

export default app;
