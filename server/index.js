import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello from Kambaz Quizzes Server!");
});

app.get("/", (req, res) => {
  res.send("Kambaz Quizzes API Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
