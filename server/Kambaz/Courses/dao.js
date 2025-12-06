import { v4 as uuidv4 } from "uuid";
import { Course } from "../../models/Course.js";
import { Enrollment } from "../../models/Enrollment.js";

export default function CoursesDao() {
  function findAllCourses() {
    return Course.find();
  }

  async function findCoursesForEnrolledUser(userId) {
    const enrollments = await Enrollment.find({ user: userId });
    const courseIds = enrollments.map((e) => e.course);
    return await Course.find({ _id: { $in: courseIds } });
  }

  function createCourse(course) {
    const newCourse = new Course({ ...course, _id: uuidv4() });
    return newCourse.save();
  }

  async function deleteCourse(courseId) {
    await Course.findByIdAndDelete(courseId);
    await Enrollment.deleteMany({ course: courseId });
    return true;
  }

  function updateCourse(courseId, courseUpdates) {
    return Course.findByIdAndUpdate(courseId, courseUpdates, { new: true });
  }

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
