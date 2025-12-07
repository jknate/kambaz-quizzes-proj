import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "Quiz" },
    user: { type: String, ref: "User" },
    attempt: Number,
    answers: [
      {
        question: { type: String, ref: "Question" },
        answer: mongoose.Schema.Types.Mixed, // Can be string, number, boolean
      },
    ],
    score: Number,
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "quizAttempts" }
);

export const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);
