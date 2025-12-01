/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function QuizPreviewPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const quiz = useSelector((s: any) =>
    s.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: "850px" }}>
      <h2 className="fw-semibold mb-3">Quiz Preview</h2>

      <Card className="p-4">
        <p className="text-muted">
          This is a placeholder for the Quiz Preview screen.  
        </p>

        <h4 className="fw-bold mb-3">{quiz.title}</h4>

        <p className="text-muted mb-4">
        </p>

        <Button
          variant="secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
        >
          Back to Quiz Details
        </Button>
      </Card>
    </div>
  );
}
