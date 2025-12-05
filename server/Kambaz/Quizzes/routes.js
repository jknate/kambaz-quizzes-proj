import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app, db) {
  const dao = QuizzesDao(db);

  const findAllQuizzes = (req, res) => {
    res.json(dao.findAllQuizzes());
  };

  const findQuizById = (req, res) => {
    const { quizId } = req.params;
    const a = dao.findQuizById(quizId);
    if (!a) {
      res.status(404).json({ message: `Quiz ${quizId} not found` });
      return;
    }
    res.json(a);
  };

  const findQuizzesForCourse = (req, res) => {
    const { courseId } = req.params;
    const list = dao.findQuizzesForCourse(courseId);
    res.json(list);
  };

  const createQuiz = (req, res) => {
    const newQuiz = dao.createQuiz(req.body);
    res.json(newQuiz);
  };

  const updateQuiz = (req, res) => {
    const { quizId } = req.params;
    const updated = dao.updateQuiz(quizId, req.body);
    if (!updated) {
      res
        .status(404)
        .json({ message: `Unable to update quiz ${quizId}` });
      return;
    }
    res.json(updated);
  };

  const deleteQuiz = (req, res) => {
    const { quizId } = req.params;
    dao.deleteQuiz(quizId);
    res.sendStatus(200);
  };

  app.get("/api/quizzes", findAllQuizzes);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.post("/api/quizzes", createQuiz);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
}
