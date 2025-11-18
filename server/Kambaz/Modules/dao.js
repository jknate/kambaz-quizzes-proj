import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    const { modules } = db;
    return modules.filter((m) => m.course === courseId);
  }

  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  function deleteModule(moduleId) {
    const { modules } = db;
    db.modules = modules.filter((m) => m._id !== moduleId);
    return true;
  }

  function updateModule(moduleId, moduleUpdates) {
    const { modules } = db;
    const mod = modules.find((m) => m._id === moduleId);
    Object.assign(mod, moduleUpdates);
    return mod;
  }

  return { findModulesForCourse, createModule, deleteModule, updateModule };
}
