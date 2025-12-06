import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  const findAllCourses = async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findCoursesForEnrolledUser = async (req, res) => {
    try {
      let { userId } = req.params;
      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        userId = currentUser._id;
      }
      const courses = await dao.findCoursesForEnrolledUser(userId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      const newCourse = await dao.createCourse(req.body);
      if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      }
      res.json(newCourse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const status = await dao.deleteCourse(courseId);
      res.send(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const courseUpdates = req.body;
      const updated = await dao.updateCourse(courseId, courseUpdates);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
}
