import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAllAssignments = (req, res) => {
    res.json(dao.findAllAssignments());
  };

  const findAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const a = dao.findAssignmentById(assignmentId);
    if (!a) {
      res.status(404).json({ message: `Assignment ${assignmentId} not found` });
      return;
    }
    res.json(a);
  };

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const list = dao.findAssignmentsForCourse(courseId);
    res.json(list);
  };

  const createAssignment = (req, res) => {
    const newAssignment = dao.createAssignment(req.body);
    res.json(newAssignment);
  };

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const updated = dao.updateAssignment(assignmentId, req.body);
    if (!updated) {
      res
        .status(404)
        .json({ message: `Unable to update assignment ${assignmentId}` });
      return;
    }
    res.json(updated);
  };

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
