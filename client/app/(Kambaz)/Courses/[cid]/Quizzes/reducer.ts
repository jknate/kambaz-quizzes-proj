/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../../Database";

const initialState = {
  quizzes: quizzes,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: new Date().getTime().toString(),
        title: quiz.title,
        course: quiz.course,
        description: quiz.description,
        points: quiz.points,
        dueDate: quiz.dueDate,
        availableFromDate: quiz.availableFromDate,
        availableUntilDate: quiz.availableUntilDate,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== quizId
      );
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? quiz : a
      ) as any;
    },
    setQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuizzes,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
