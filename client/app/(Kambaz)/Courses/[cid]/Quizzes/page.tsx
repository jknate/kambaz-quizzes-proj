/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ListGroup, ListGroupItem, Collapse } from "react-bootstrap";
import { BsGripVertical, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import QuizzesControls from "./QuizzesControls";
import QuizzesControlButtons from "./QuizzesControlButtons";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams();
  const [isQuizzesOpen, setIsQuizzesOpen] = useState(true);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-quizzes">
      <QuizzesControls />
      <br />

      <ListGroup className="rounded-0" id="wd-quizzes-list">
        <ListGroupItem className="wd-quizzes-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => setIsQuizzesOpen(!isQuizzesOpen)}
              style={{ cursor: "pointer" }}
            >
              <BsGripVertical className="me-2 fs-3" />
              {isQuizzesOpen ? (
                <BsChevronDown className="me-2" />
              ) : (
                <BsChevronUp className="me-2" />
              )}
              QUIZZES
            </div>
            <div className="d-flex align-items-center">
              <QuizzesControlButtons />
            </div>
          </div>
          <Collapse in={isQuizzesOpen}>
            <div>
              <ListGroup className="wd-quizzes-items rounded-0">
                {quizzes
                  .filter((quiz: any) => quiz.course === cid)
                  .map((quiz: any) => (
                    <ListGroupItem
                      key={quiz._id}
                      className="wd-quizzes-item p-3 ps-1"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="d-flex align-items-center">
                          <BsGripVertical className="me-2 fs-3" />
                          <FaEdit className="me-3 fs-5 text-success" />
                          <div>
                            <Link
                              href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                              className="wd-quizzes-link text-decoration-none text-dark fw-bold"
                            >
                              {quiz.title}
                            </Link>
                            <div className="text-muted small mt-1">
                              <span className="text-danger">
                              </span>{" "}
                              | <strong>Not Available until</strong>{" "}
                              {quiz.availableDate} at 12:00am |
                              <strong> Due</strong> {quiz.dueDate} at
                              11:59pm | {quiz.points}pts | {quiz.Questions} Questions
                            </div>
                          </div>
                        </div>
                        <QuizzesControlButtons
                          quizId={quiz._id}
                          deleteQuiz={(quizId) => {
                            if (
                              window.confirm(
                                "Are you sure you want to remove this quiz?"
                              )
                            ) {
                              dispatch(deleteQuiz(quizId));
                            }
                          }}
                        />
                      </div>
                    </ListGroupItem>
                  ))}
              </ListGroup>
            </div>
          </Collapse>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
"use client";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { addQuiz, deleteQuiz, togglePublishQuiz } from "./reducer";

export default function QuizzesPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cid } = useParams();

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  const allQuizzes = useSelector((state: any) => state.quizzesReducer.quizzes || []);
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
        <div className="card-header fw-semibold">
          Assignment Quizzes
        </div>

        <ul className="list-group list-group-flush">

          {quizzes.length === 0 ? (
            <li className="list-group-item fst-italic text-muted">
              {isFaculty ? 'No quizzes yet. Click "+ Quiz".' : "No quizzes available yet."}
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
                      {quiz.published ? "Available" : "Unpublished"} •{" "}
                      Due {quiz.dueDate || "No due date"} •{" "}
                      {quiz.points ?? 0} pts •{" "}
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

