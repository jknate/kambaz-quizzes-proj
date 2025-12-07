import { v4 as uuidv4 } from "uuid";
import { Module } from "../../models/Module.js";

export default function ModulesDao() {
  function findModulesForCourse(courseId) {
    return Module.find({ course: courseId });
  }

  function createModule(module) {
    const newModule = new Module({ ...module, _id: uuidv4() });
    return newModule.save();
  }

  function deleteModule(moduleId) {
    return Module.findByIdAndDelete(moduleId).then(() => true);
  }

  function updateModule(moduleId, moduleUpdates) {
    return Module.findByIdAndUpdate(moduleId, moduleUpdates, { new: true });
  }

  return { findModulesForCourse, createModule, deleteModule, updateModule };
}
