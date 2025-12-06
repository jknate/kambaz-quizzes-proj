import express from "express";
import cors from "cors";
import session from "express-session";
import { connectDB } from "./config/db.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import QuizzesRoutes from "./Kambaz/Quizzes/routes.js";
import QuestionsRoutes from "./Kambaz/Questions/routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
await connectDB();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Session middleware
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "keyboard cat",
  })
);

app.get("/hello", (req, res) => {
  res.send("Hello from Kambaz Quizzes Server!");
});

app.get("/", (req, res) => {
  res.send("Kambaz Quizzes API Server is running!");
});

// Register routes
UserRoutes(app);
CourseRoutes(app);
AssignmentsRoutes(app);
ModulesRoutes(app);
QuizzesRoutes(app);
QuestionsRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
