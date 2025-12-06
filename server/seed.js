import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import { Course } from "./models/Course.js";
import { Assignment } from "./models/Assignment.js";
import { Enrollment } from "./models/Enrollment.js";
import { Module } from "./models/Module.js";
import { Quiz } from "./models/Quiz.js";
import { Question } from "./models/Question.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Assignment.deleteMany({});
    await Enrollment.deleteMany({});
    await Module.deleteMany({});
    await Quiz.deleteMany({});
    await Question.deleteMany({});
    console.log("Cleared existing data");

    // Read JSON files from client database
    const dataPath = "../client/app/(Kambaz)/Database";

    const usersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, dataPath, "users.json"), "utf-8")
    );
    const coursesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, dataPath, "courses.json"), "utf-8")
    );
    const assignmentsData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, dataPath, "assignments.json"),
        "utf-8"
      )
    );
    const enrollmentsData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, dataPath, "enrollments.json"),
        "utf-8"
      )
    );
    const modulesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, dataPath, "modules.json"), "utf-8")
    );
    const quizzesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, dataPath, "quizzes.json"), "utf-8")
    );
    const questionsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, dataPath, "questions.json"), "utf-8")
    );

    // Insert data
    await User.insertMany(usersData);
    console.log(`Inserted ${usersData.length} users`);

    await Course.insertMany(coursesData);
    console.log(`Inserted ${coursesData.length} courses`);

    await Assignment.insertMany(assignmentsData);
    console.log(`Inserted ${assignmentsData.length} assignments`);

    await Enrollment.insertMany(enrollmentsData);
    console.log(`Inserted ${enrollmentsData.length} enrollments`);

    await Module.insertMany(modulesData);
    console.log(`Inserted ${modulesData.length} modules`);

    await Quiz.insertMany(quizzesData);
    console.log(`Inserted ${quizzesData.length} quizzes`);

    await Question.insertMany(questionsData);
    console.log(`Inserted ${questionsData.length} questions`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
