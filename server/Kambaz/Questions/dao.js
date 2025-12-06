import { v4 as uuidv4 } from "uuid";
import { Question } from "../../models/Question.js";

export default function QuestionsDao() {
  function findAllQuestions() {
    return Question.find();
  }

  function findQuestionById(id) {
    return Question.findById(id);
  }

  function findQuestionsForCourse(courseId) {
    return Question.find({ course: courseId });
  }

  function createQuestion(question) {
    const newQuestion = new Question({ ...question, _id: uuidv4() });
    return newQuestion.save();
  }

  function updateQuestion(questionId, questionUpdates) {
    return Question.findByIdAndUpdate(questionId, questionUpdates, {
      new: true,
    });
  }

  function deleteQuestion(questionId) {
    return Question.findByIdAndDelete(questionId).then(() => true);
  }

  return {
    findAllQuestions,
    findQuestionById,
    findQuestionsForCourse,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
}
