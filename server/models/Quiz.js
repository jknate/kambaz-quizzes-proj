import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    course: String,
    quizType: String,
    assignmentGroup: String,
    shuffleAnswers: Boolean,
    timeLimit: Number,
    multipleAttempts: Boolean,
    howManyAttempts: Number,
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtATime: Boolean,
    webcamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    dueDate: Date,
    availableDate: Date,
    availableUntilDate: Date,
    published: Boolean,
    questions: [{ type: Object }],
    points: Number,
    Questions: Number,
  },
  { collection: "quizzes" }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
