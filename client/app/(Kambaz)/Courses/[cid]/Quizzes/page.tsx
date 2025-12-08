"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { addQuiz, deleteQuiz, togglePublishQuiz, setQuizzes } from "./reducer";

export default function Quizzes() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cid } = useParams();

  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const allQuizzes = useSelector(
    (state: any) => state.quizzesReducer.quizzes || []
  );
  const quizzes = allQuizzes
    .filter((quiz: any) => quiz.course === cid)
    .sort((a: any, b: any) => {
      // Sort by availableDate - quizzes without dates go to the end
      if (!a.availableDate && !b.availableDate) return 0;
      if (!a.availableDate) return 1;
      if (!b.availableDate) return -1;
      return (
        new Date(a.availableDate).getTime() -
        new Date(b.availableDate).getTime()
      );
    });

  // Fetch quizzes from MongoDB on component mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("/api/proxy/quizzes");
        if (response.ok) {
          const data = await response.json();
          dispatch(setQuizzes(data));
        }
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [dispatch]);

  const handleAddQuiz = async () => {
    try {
      const newQuiz = {
        _id: uuidv4(),
        course: cid as string,
        title: "New Quiz",
        description: "",
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        howManyAttempts: 1,
        showCorrectAnswers: "Immediately",
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "",
        availableDate: "",
        untilDate: "",
        published: false,
        questions: [],
        points: 0,
      };

      // Create quiz in MongoDB first
      const response = await axios.post(`/api/proxy/quizzes`, newQuiz);
      const savedQuiz = response.data;

      // Then update Redux store with the saved quiz from the server
      dispatch(addQuiz(savedQuiz));
      router.push(`/Courses/${cid}/Quizzes/${savedQuiz._id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz. Please try again.");
    }
  };

  const handleTogglePublish = async (e: React.MouseEvent, quiz: any) => {
    e.stopPropagation();
    try {
      // Update in MongoDB
      await axios.put(`/api/proxy/quizzes/${quiz._id}`, {
        ...quiz,
        published: !quiz.published,
      });

      // Update Redux store
      dispatch(togglePublishQuiz(quiz._id));
    } catch (error) {
      console.error("Error toggling publish status:", error);
      alert("Failed to update quiz. Please try again.");
    }
  };

  const handleDeleteQuiz = async (e: React.MouseEvent, quizId: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this quiz?")) {
      return;
    }

    try {
      // Delete from MongoDB
      await axios.delete(`/api/proxy/quizzes/${quizId}`);

      // Update Redux store
      dispatch(deleteQuiz(quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert("Failed to delete quiz. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-semibold">Quizzes</h1>

        {isFaculty && (
          <button className="btn btn-danger px-4" onClick={handleAddQuiz}>
            + Quiz
          </button>
        )}
      </div>

      {/* Quiz List Card */}
      <div className="card">
        <div className="card-header fw-semibold">Assignment Quizzes</div>

        <ul className="list-group list-group-flush">
          {quizzes.length === 0 ? (
            <li className="list-group-item fst-italic text-muted">
              {isFaculty
                ? 'No quizzes yet. Click "+ Quiz".'
                : "No quizzes available yet."}
            </li>
          ) : (
            quizzes.map((quiz: any) => (
              <li
                key={quiz._id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)
                }
              >
                {/* LEFT SIDE */}
                <div className="d-flex gap-3">
                  {/* Published icon */}
                  <div>
                    {quiz.published ? (
                      <span className="text-success fs-5">✔</span>
                    ) : (
                      <span className="text-secondary fs-5"></span>
                    )}
                  </div>

                  <div>
                    <div className="fw-semibold">{quiz.title}</div>

                    <div className="text-muted small">
                      {quiz.published ? "Available" : "Unpublished"} • Due{" "}
                      {quiz.dueDate || "No due date"} • {quiz.points ?? 0} pts •{" "}
                      {quiz.questions?.length ?? 0} Questions
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE — FACULTY CONTROLS */}
                {isFaculty && (
                  <div className="d-flex align-items-center gap-3">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={(e) => handleTogglePublish(e, quiz)}
                    >
                      {quiz.published ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      className="btn btn-link text-primary p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/Courses/${cid}/Quizzes/${quiz._id}/Edit`);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-link text-danger p-0"
                      onClick={(e) => handleDeleteQuiz(e, quiz._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
