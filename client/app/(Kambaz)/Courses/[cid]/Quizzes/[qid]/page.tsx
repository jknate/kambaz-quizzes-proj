/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, Button, Table } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";

export default function QuizDetailsScreen() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const currentUser = useSelector((s: any) => s.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch quiz from MongoDB
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/proxy/quizzes/${qid}`);
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    if (qid) {
      fetchQuiz();
    }
  }, [qid]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      {/* ============ TOP BUTTONS ============ */}
      <div className="d-flex justify-content-center gap-3 mb-3">
        {/* Faculty buttons */}
        {isFaculty && (
          <>
            <Button
              variant="secondary"
              onClick={() =>
                router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)
              }
            >
              Preview
            </Button>

            <Button
              variant="secondary"
              className="d-flex align-items-center gap-2"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`)}
            >
              <FaPencilAlt size={14} />
              Edit
            </Button>
          </>
        )}

        {/* Student "Start Quiz" button */}
        {!isFaculty && (
          <Button
            variant="primary"
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)
            }
          >
            Start Quiz
          </Button>
        )}
      </div>

      {/* ============ TITLE ============ */}
      <h2 className="fw-semibold mb-3">{quiz.title}</h2>

      {/* ============ DETAILS CARD ============ */}
      <Card className="p-4">
        <Table borderless className="align-middle" style={{ width: "100%" }}>
          <tbody>
            <DetailsRow label="Quiz Type" value={quiz.quizType} />
            <DetailsRow label="Points" value={quiz.points ?? 0} />
            <DetailsRow label="Assignment Group" value={quiz.assignmentGroup} />
            <DetailsRow
              label="Shuffle Answers"
              value={quiz.shuffleAnswers ? "Yes" : "No"}
            />
            <DetailsRow
              label="Time Limit"
              value={`${quiz.timeLimit} Minutes`}
            />
            <DetailsRow
              label="Multiple Attempts"
              value={quiz.multipleAttempts ? "Yes" : "No"}
            />

            {/* NEW — How Many Attempts */}
            {quiz.multipleAttempts && (
              <DetailsRow
                label="How Many Attempts"
                value={quiz.howManyAttempts}
              />
            )}

            {/* NEW — Access Code */}
            <DetailsRow label="Access Code" value={quiz.accessCode || "None"} />

            <DetailsRow
              label="Show Correct Answers"
              value={quiz.showCorrectAnswers}
            />
            <DetailsRow
              label="One Question at a Time"
              value={quiz.oneQuestionAtATime ? "Yes" : "No"}
            />
            <DetailsRow
              label="Webcam Required"
              value={quiz.webcamRequired ? "Yes" : "No"}
            />
            <DetailsRow
              label="Lock Questions After Answering"
              value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
            />
          </tbody>
        </Table>

        <hr className="my-4" />

        {/* ============ DATES TABLE ============ */}
        <Table bordered>
          <thead>
            <tr className="fw-semibold text-center">
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              <td>{quiz.dueDate || "—"}</td>
              <td>Everyone</td>
              <td>{quiz.availableDate || "—"}</td>
              <td>{quiz.untilDate || "—"}</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

/* Shared row layout */
function DetailsRow({ label, value }: any) {
  return (
    <tr>
      <td
        align="right"
        style={{ width: "240px", fontWeight: 600, paddingRight: "20px" }}
      >
        {label}
      </td>
      <td>{value}</td>
    </tr>
  );
}
