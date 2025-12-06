import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app) {
  const dao = QuestionsDao();

  const findAllQuestions = async (req, res) => {
    try {
      const questions = await dao.findAllQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findQuestionById = async (req, res) => {
    try {
      const { questionId } = req.params;
      const question = await dao.findQuestionById(questionId);
      if (!question) {
        res.status(404).json({ message: `Question ${questionId} not found` });
        return;
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findQuestionsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const list = await dao.findQuestionsForCourse(courseId);
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createQuestion = async (req, res) => {
    try {
      const newQuestion = await dao.createQuestion(req.body);
      res.json(newQuestion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateQuestion = async (req, res) => {
    try {
      const { questionId } = req.params;
      const updated = await dao.updateQuestion(questionId, req.body);
      if (!updated) {
        res
          .status(404)
          .json({ message: `Unable to update question ${questionId}` });
        return;
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteQuestion = async (req, res) => {
    try {
      const { questionId } = req.params;
      await dao.deleteQuestion(questionId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/questions", findAllQuestions);
  app.get("/api/questions/:questionId", findQuestionById);
  app.get("/api/courses/:courseId/questions", findQuestionsForCourse);
  app.post("/api/questions", createQuestion);
  app.put("/api/questions/:questionId", updateQuestion);
  app.delete("/api/questions/:questionId", deleteQuestion);
}
