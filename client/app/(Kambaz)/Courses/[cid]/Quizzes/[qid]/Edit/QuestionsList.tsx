/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ListGroup, Button, Badge } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Question {
  _id?: string;
  type: string;
  title: string;
  points: number;
  [key: string]: any;
}

interface QuestionsListProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (questionId: string | undefined) => void;
}

export default function QuestionsList({
  questions,
  onEdit,
  onDelete,
}: QuestionsListProps) {
  if (questions.length === 0) {
    return (
      <div className="text-center text-muted py-4">
        <p>No questions added yet</p>
      </div>
    );
  }

  return (
    <ListGroup>
      {questions.map((question, idx) => (
        <ListGroup.Item
          key={question._id || idx}
          className="d-flex justify-content-between align-items-center"
        >
          <div className="flex-grow-1">
            <div className="fw-semibold">
              {idx + 1}. {question.title}
            </div>
            <div className="small text-muted">
              <Badge bg="info" className="me-2">
                {question.type === "fill-in-the-blank"
                  ? "Fill in the Blank"
                  : question.type}
              </Badge>
              <span className="me-2">
                {question.points} {question.points === 1 ? "point" : "points"}
              </span>
              {question.possibleAnswers && (
                <span>
                  {question.possibleAnswers.length}{" "}
                  {question.possibleAnswers.length === 1 ? "answer" : "answers"}
                </span>
              )}
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEdit(question)}
              title="Edit question"
            >
              <FaEdit />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this question?"
                  )
                ) {
                  onDelete(question._id);
                }
              }}
              title="Delete question"
            >
              <FaTrash />
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
