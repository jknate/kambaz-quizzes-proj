import QuizAttemptsDao from "./dao.js";

export default function QuizAttemptsRoutes(app) {
  const dao = QuizAttemptsDao();

  // Get all attempts for a quiz by a user
  const findAttemptsByQuizAndUser = async (req, res) => {
    try {
      const { quizId, userId } = req.params;
      const attempts = await dao.findAttemptsByQuizAndUser(quizId, userId);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get latest attempt for a quiz by a user
  const findLatestAttempt = async (req, res) => {
    try {
      const { quizId, userId } = req.params;
      const attempt = await dao.findLatestAttempt(quizId, userId);
      res.json(attempt || null);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Count attempts for a quiz by a user
  const countAttempts = async (req, res) => {
    try {
      const { quizId, userId } = req.params;
      const count = await dao.countAttempts(quizId, userId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Submit a quiz attempt
  const createAttempt = async (req, res) => {
    try {
      const newAttempt = await dao.createAttempt(req.body);
      res.json(newAttempt);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get specific attempt by ID
  const findAttemptById = async (req, res) => {
    try {
      const { attemptId } = req.params;
      const attempt = await dao.findAttemptById(attemptId);
      if (!attempt) {
        res.status(404).json({ message: `Attempt ${attemptId} not found` });
        return;
      }
      res.json(attempt);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  app.get(
    "/api/quizAttempts/quiz/:quizId/user/:userId",
    findAttemptsByQuizAndUser
  );
  app.get(
    "/api/quizAttempts/quiz/:quizId/user/:userId/latest",
    findLatestAttempt
  );
  app.get("/api/quizAttempts/quiz/:quizId/user/:userId/count", countAttempts);
  app.post("/api/quizAttempts", createAttempt);
  app.get("/api/quizAttempts/:attemptId", findAttemptById);
}
