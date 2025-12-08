import { v4 as uuidv4 } from "uuid";
import { Quiz } from "../../models/Quiz.js";

export default function QuizzesDao() {
  function findAllQuizzes() {
    return Quiz.find().populate("questions");
  }

  function findQuizById(id) {
    return Quiz.findById(id).populate("questions");
  }

  function findQuizzesForCourse(courseId) {
    return Quiz.find({ course: courseId }).populate("questions");
  }

  async function createQuiz(quiz) {
    const newQuiz = new Quiz({ ...quiz, _id: uuidv4() });
    await newQuiz.save();
    return Quiz.findById(newQuiz._id).populate("questions");
  }

  function updateQuiz(quizId, quizUpdates) {
    return Quiz.findByIdAndUpdate(quizId, quizUpdates, { new: true });
  }

  function deleteQuiz(quizId) {
    return Quiz.findByIdAndDelete(quizId).then(() => true);
  }

  return {
    findAllQuizzes,
    findQuizById,
    findQuizzesForCourse,
    createQuiz,
    updateQuiz,
    deleteQuiz,
  };
}
