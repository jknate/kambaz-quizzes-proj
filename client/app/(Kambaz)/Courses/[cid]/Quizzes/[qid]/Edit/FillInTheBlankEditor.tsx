"use client";

import { useState } from "react";
import { Form, Button, Card, ListGroup } from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";

interface FillInTheBlankQuestion {
  _id?: string;
  type: "fill-in-the-blank";
  title: string;
  points: number;
  question: string;
  possibleAnswers: string[];
  caseSensitive: boolean;
}

interface FillInTheBlankEditorProps {
  onSave: (question: FillInTheBlankQuestion) => void;
  onCancel: () => void;
  initialQuestion?: FillInTheBlankQuestion;
}

export default function FillInTheBlankEditor({
  onSave,
  onCancel,
  initialQuestion,
}: FillInTheBlankEditorProps) {
  const [question, setQuestion] = useState<FillInTheBlankQuestion>(
    initialQuestion || {
      type: "fill-in-the-blank",
      title: "",
      points: 1,
      question: "",
      possibleAnswers: [""],
      caseSensitive: false,
    }
  );

  const [newAnswer, setNewAnswer] = useState("");

  const handleSave = () => {
    const filteredAnswers = question.possibleAnswers.filter(
      (a) => a.trim() !== ""
    );

    if (!question.title.trim()) {
      alert("Please enter a question title");
      return;
    }

    if (!question.question.trim()) {
      alert("Please enter the question text");
      return;
    }

    if (filteredAnswers.length === 0) {
      alert("Please add at least one correct answer");
      return;
    }

    onSave({
      ...question,
      possibleAnswers: filteredAnswers,
    });
  };

  const addAnswer = () => {
    if (newAnswer.trim()) {
      setQuestion({
        ...question,
        possibleAnswers: [...question.possibleAnswers, newAnswer],
      });
      setNewAnswer("");
    }
  };

  const removeAnswer = (index: number) => {
    setQuestion({
      ...question,
      possibleAnswers: question.possibleAnswers.filter((_, i) => i !== index),
    });
  };

  const updateAnswer = (index: number, value: string) => {
    const updated = [...question.possibleAnswers];
    updated[index] = value;
    setQuestion({
      ...question,
      possibleAnswers: updated,
    });
  };

  return (
    <Card className="p-4 mb-4">
      <h5 className="fw-semibold mb-3">
        {initialQuestion ? "Edit" : "Create"} Fill in the Blank Question
      </h5>

      <Form>
        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Question Title</Form.Label>
          <Form.Control
            type="text"
            value={question.title}
            onChange={(e) =>
              setQuestion({ ...question, title: e.target.value })
            }
            placeholder="e.g., Capital of France"
          />
          <Form.Text className="text-muted">
            A short title to identify this question
          </Form.Text>
        </Form.Group>

        {/* Points */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Points</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={question.points}
            onChange={(e) =>
              setQuestion({
                ...question,
                points: Math.max(1, parseInt(e.target.value) || 1),
              })
            }
          />
        </Form.Group>

        {/* Question Text */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Question Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={question.question}
            onChange={(e) =>
              setQuestion({ ...question, question: e.target.value })
            }
            placeholder="Enter the question. Use _______ (7 underscores) to indicate where the blank should appear."
          />
          <Form.Text className="text-muted">
            Use <code>_______</code> to mark where the student fills in the
            answer
          </Form.Text>
        </Form.Group>

        {/* Preview */}
        {question.question && (
          <Card className="mb-3 p-3 bg-light">
            <Form.Label className="fw-semibold mb-2">Preview</Form.Label>
            <div
              dangerouslySetInnerHTML={{
                __html: question.question
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(
                    /_______/g,
                    '<input type="text" style="border: 1px solid #ccc; padding: 4px 8px; width: 100px; font-style: italic;" disabled />'
                  ),
              }}
            />
          </Card>
        )}

        {/* Possible Answers */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">
            Correct Answers (Possible Variations)
          </Form.Label>
          <Form.Text className="d-block text-muted mb-2">
            Add all variations of correct answers. Students must match at least
            one.
          </Form.Text>

          {/* Answer List */}
          {question.possibleAnswers.length > 0 && (
            <ListGroup className="mb-3">
              {question.possibleAnswers.map((answer, idx) => (
                <ListGroup.Item
                  key={idx}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={answer}
                      onChange={(e) => updateAnswer(idx, e.target.value)}
                      placeholder={`Answer ${idx + 1}`}
                    />
                  </div>
                  {question.possibleAnswers.length > 1 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => removeAnswer(idx)}
                    >
                      <FaTrash size={12} />
                    </Button>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* Add New Answer */}
          <div className="input-group">
            <Form.Control
              type="text"
              placeholder="Enter a correct answer..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addAnswer();
                }
              }}
            />
            <Button variant="outline-secondary" onClick={addAnswer}>
              <FaPlus /> Add Answer
            </Button>
          </div>
        </Form.Group>

        {/* Case Sensitivity */}
        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            id="caseSensitive"
            label="Case sensitive answers"
            checked={question.caseSensitive}
            onChange={(e) =>
              setQuestion({
                ...question,
                caseSensitive: e.target.checked,
              })
            }
          />
          <Form.Text className="text-muted ms-3">
            If checked, answers must match exactly (e.g., Paris ≠ paris)
          </Form.Text>
        </Form.Group>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={
              !question.title ||
              !question.question ||
              question.possibleAnswers.filter((a) => a.trim()).length === 0
            }
          >
            {initialQuestion ? "Update Question" : "Add Question"}
          </Button>
        </div>
      </Form>
    </Card>
  );
}