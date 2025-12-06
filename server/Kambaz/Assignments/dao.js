import { v4 as uuidv4 } from "uuid";
import { Assignment } from "../../models/Assignment.js";

export default function AssignmentsDao() {
  function findAllAssignments() {
    return Assignment.find();
  }

  function findAssignmentById(id) {
    return Assignment.findById(id);
  }

  function findAssignmentsForCourse(courseId) {
    return Assignment.find({ course: courseId });
  }

  function createAssignment(assignment) {
    const newAssignment = new Assignment({ ...assignment, _id: uuidv4() });
    return newAssignment.save();
  }

  function updateAssignment(assignmentId, assignmentUpdates) {
    return Assignment.findByIdAndUpdate(assignmentId, assignmentUpdates, {
      new: true,
    });
  }

  function deleteAssignment(assignmentId) {
    return Assignment.findByIdAndDelete(assignmentId).then(() => true);
  }

  return {
    findAllAssignments,
    findAssignmentById,
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
