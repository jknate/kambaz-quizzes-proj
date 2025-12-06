import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    Questions: Number,
    points: Number,
    dueDate: Date,
    availableDate: Date,
    availableUntilDate: Date,
  },
  { collection: "quizzes" }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
