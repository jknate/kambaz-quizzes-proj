/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../../../Database";

const initialState = {
  questions: questions,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, { payload: question }) => {
      const newQuestion: any = {
        _id: new Date().getTime().toString(),
        title: question.title,
        course: question.course,
        type: question.type,
        points: question.points,
        question: question.question,
        possibleAnswers: question.possibleAnswers,
        caseSensitive: question.caseSensitive,
      };
      state.questions = [...state.questions, newQuestion] as any;
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: any) => q._id !== questionId
      );
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q
      ) as any;
    },
    setQuestions: (state, { payload: questions }) => {
      state.questions = questions;
    },
  },
});

export const { addQuestion, deleteQuestion, updateQuestion, setQuestions } =
  questionsSlice.actions;
export default questionsSlice.reducer;
