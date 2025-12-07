import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/CourseModules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentsReducer from "./Enrollments/reducer";
import quizzesReducer from "./Courses/[cid]/Quizzes/reducer";
import questionsReducer from "./Courses/[cid]/Quizzes/questionsReducer";

const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    quizzesReducer,
    questionReducer: questionsReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
  },
});

export default store;
