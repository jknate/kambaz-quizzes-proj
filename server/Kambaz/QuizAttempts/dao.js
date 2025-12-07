import { v4 as uuidv4 } from "uuid";
import { QuizAttempt } from "../../models/QuizAttempt.js";

export default function QuizAttemptsDao() {
  function findAttemptsByQuizAndUser(quizId, userId) {
    return QuizAttempt.find({ quiz: quizId, user: userId })
      .populate("quiz")
      .populate("answers.question")
      .sort({ attempt: -1 });
  }

  function findLatestAttempt(quizId, userId) {
    return QuizAttempt.findOne({ quiz: quizId, user: userId })
      .populate("quiz")
      .populate("answers.question")
      .sort({ attempt: -1 });
  }

  function countAttempts(quizId, userId) {
    return QuizAttempt.countDocuments({ quiz: quizId, user: userId });
  }

  function createAttempt(attemptData) {
    const newAttempt = new QuizAttempt({ ...attemptData, _id: uuidv4() });
    return newAttempt.save();
  }

  function findAttemptById(attemptId) {
    return QuizAttempt.findById(attemptId)
      .populate("quiz")
      .populate("answers.question");
  }

  return {
    findAttemptsByQuizAndUser,
    findLatestAttempt,
    countAttempts,
    createAttempt,
    findAttemptById,
  };
}
