import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Quiz {
  _id: string;
  course: string;
  title: string;
  description: string;
  quizType: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  published: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: any[];
}

interface QuizState {
  quizzes: Quiz[];
}

const initialState: QuizState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },

    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
    },

    togglePublishQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload ? { ...q, published: !q.published } : q
      );
    },

    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload._id ? action.payload : q
      );
    },

    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  togglePublishQuiz,
  updateQuiz,
  setQuizzes,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;