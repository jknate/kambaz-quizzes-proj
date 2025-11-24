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
}
