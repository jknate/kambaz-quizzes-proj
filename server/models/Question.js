import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    type: String, // fill-in-the-blank, multiple-choice, true-false, etc.
    points: Number,
    question: String,
    possibleAnswers: [String],
    caseSensitive: Boolean,
    correctAnswerIndex: Number, // For multiple-choice and true-false questions
  },
  { collection: "questions" }
);

export const Question = mongoose.model("Question", questionSchema);
