"use client";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { addQuiz, deleteQuiz, togglePublishQuiz } from "./reducer";

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
  const quizzes = allQuizzes.filter((quiz: any) => quiz.course === cid);

  const handleAddQuiz = () => {
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

    dispatch(addQuiz(newQuiz));
    router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}`);
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
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(togglePublishQuiz(quiz._id));
                      }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteQuiz(quiz._id));
                      }}
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
