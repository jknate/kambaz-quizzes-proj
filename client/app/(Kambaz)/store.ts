import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/CourseModules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentsReducer from "./Enrollments/reducer";
import quizzesReducer from "./Courses/[cid]/Quizzes/reducer";
import questionsReducer from "./Courses/[cid]/Quizzes/questionsReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accountReducer"], // Only persist the account state
};

const rootReducer = combineReducers({
  coursesReducer,
  modulesReducer,
  quizzesReducer,
  questionReducer: questionsReducer,
  accountReducer,
  assignmentsReducer,
  enrollmentsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
