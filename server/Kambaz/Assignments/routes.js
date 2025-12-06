import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
  const dao = AssignmentsDao();

  const findAllAssignments = async (req, res) => {
    try {
      const assignments = await dao.findAllAssignments();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findAssignmentById = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const a = await dao.findAssignmentById(assignmentId);
      if (!a) {
        res
          .status(404)
          .json({ message: `Assignment ${assignmentId} not found` });
        return;
      }
      res.json(a);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findAssignmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const list = await dao.findAssignmentsForCourse(courseId);
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createAssignment = async (req, res) => {
    try {
      const newAssignment = await dao.createAssignment(req.body);
      res.json(newAssignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const updated = await dao.updateAssignment(assignmentId, req.body);
      if (!updated) {
        res
          .status(404)
          .json({ message: `Unable to update assignment ${assignmentId}` });
        return;
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      await dao.deleteAssignment(assignmentId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
