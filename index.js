import express from "express";
import cors from "cors";
import { createTask } from './database/crud.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;

  console.log("Received task:", { title, description });

  try {
    const task = await createTask(title, description);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
