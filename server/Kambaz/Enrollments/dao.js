import { v4 as uuidv4 } from "uuid";
import { Enrollment } from "../../models/Enrollment.js";

export default function EnrollmentsDao() {
  async function enrollUserInCourse(userId, courseId) {
    const enrollment = new Enrollment({
      _id: uuidv4(),
      user: userId,
      course: courseId,
    });
    await enrollment.save();
    return enrollment;
  }

  function findEnrollmentsByUser(userId) {
    return Enrollment.find({ user: userId });
  }

  function findEnrollmentsByCourse(courseId) {
    return Enrollment.find({ course: courseId });
  }

  return { enrollUserInCourse, findEnrollmentsByUser, findEnrollmentsByCourse };
}
