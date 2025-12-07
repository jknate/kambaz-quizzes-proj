import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();

  const findAllQuizzes = async (req, res) => {
    try {
      const quizzes = await dao.findAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findQuizById = async (req, res) => {
    try {
      const { quizId } = req.params;
      const a = await dao.findQuizById(quizId);
      if (!a) {
        res.status(404).json({ message: `Quiz ${quizId} not found` });
        return;
      }
      res.json(a);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findQuizzesForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const list = await dao.findQuizzesForCourse(courseId);
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createQuiz = async (req, res) => {
    try {
      const newQuiz = await dao.createQuiz(req.body);
      res.json(newQuiz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const updated = await dao.updateQuiz(quizId, req.body);
      if (!updated) {
        res.status(404).json({ message: `Unable to update quiz ${quizId}` });
        return;
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      await dao.deleteQuiz(quizId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/quizzes", findAllQuizzes);
  app.get("/quizzes/:quizId", findQuizById);
  app.get("/courses/:courseId/quizzes", findQuizzesForCourse);
  app.post("/quizzes", createQuiz);
  app.put("/quizzes/:quizId", updateQuiz);
  app.delete("/quizzes/:quizId", deleteQuiz);
}
