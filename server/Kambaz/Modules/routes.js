import ModulesDao from "./dao.js";

export default function ModulesRoutes(app) {
  const dao = ModulesDao();

  const findModulesForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await dao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const createModuleForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const module = { ...req.body, course: courseId };
      const newModule = await dao.createModule(module);
      res.json(newModule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const status = await dao.deleteModule(moduleId);
      res.send(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      const updated = await dao.updateModule(moduleId, moduleUpdates);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}
