import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao(db) {
  function findAllQuizzes() {
    return db.quizzes;
  }

  function findQuizById(id) {
    return db.quizzes.find((a) => a._id === id);
  }

  function findQuizzesForCourse(courseId) {
    return db.quizzes.filter((a) => a.course === courseId);
  }

  function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: uuidv4() };
    db.quizzes = [...db.quizzes, newQuiz];
    return newQuiz;
  }

  function updateQuiz(quizId, quizUpdates) {
    const { quizzes } = db;
    const quiz = quizzes.find((a) => a._id === quizId);
    Object.assign(quiz, quizUpdates);
    return quiz;
  }

  function deleteQuiz(quizId) {
    db.quizzes = db.quizzes.filter((a) => a._id !== quizId);
    return true;
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
