"use client";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../../questionsReducer";

interface MultipleChoiceEditorProps {
  question: any;
  onSave: (q: any) => void;
  onCancel: () => void;
  onChangeType: (newType: "multiple-choice" | "fill-in-the-blank") => void;
}

export default function MultipleChoiceEditor({
  question,
  onSave,
  onCancel,
  onChangeType,
}: MultipleChoiceEditorProps) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(question.title || "");
  const [points, setPoints] = useState(question.points || 1);
  const [prompt, setPrompt] = useState(question.question || "");

  // Array of answers
  const [answers, setAnswers] = useState<string[]>(
    question.possibleAnswers || [""]
  );

  // Index of correct answer
  const [correct, setCorrect] = useState<number>(
    question.correctAnswerIndex ?? 0
  );

  /** Add new empty answer row */
  const addAnswer = () => {
    setAnswers([...answers, ""]);
  };

  /** Update text of one answer */
  const updateAnswer = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  /** Delete an answer */
  const removeAnswer = (index: number) => {
    const updated = answers.filter((_, i) => i !== index);

    if (correct === index) setCorrect(0);
    else if (correct > index) setCorrect(correct - 1);

    setAnswers(updated);
  };

  /** Save question */
  const handleSave = () => {
    onSave({
      ...question,
      title,
      points,
      question: prompt,
      type: "multiple-choice",
      possibleAnswers: answers,
      correctAnswerIndex: correct,
    });
  };

  return (
    <div className="container mt-3">
      {/* Title + Type + Points */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Title */}
        <Form.Control
          type="text"
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "40%" }}
        />

        {/* QUESTION TYPE SWITCHER */}
        <Form.Select
          value="multiple-choice"
          onChange={(e) =>
            onChangeType(e.target.value as "multiple-choice" | "fill-in-the-blank")
          }
          style={{ width: "200px" }}
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="fill-in-the-blank">Fill in the Blank</option>
        </Form.Select>

        {/* Points */}
        <div className="d-flex align-items-center">
          <span className="me-2 fw-bold">pts:</span>
          <Form.Control
            type="number"
            style={{ width: "80px" }}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="text-muted mb-2">
        Enter your question and multiple answers, then select the correct one.
      </div>

      {/* Prompt */}
      <div className="mb-3">
        <label className="fw-bold mb-1">Question:</label>
        <Form.Control
          as="textarea"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      {/* Answers List */}
      <div className="mb-3">
        <label className="fw-bold">Answers:</label>

        {answers.map((answer, idx) => (
          <div key={idx} className="d-flex align-items-center gap-2 mb-2">
            <Form.Check
              type="radio"
              name="correct"
              checked={correct === idx}
              onChange={() => setCorrect(idx)}
            />

            <Form.Control
              type="text"
              placeholder="Possible Answer"
              value={answer}
              onChange={(e) => updateAnswer(idx, e.target.value)}
            />

            {answers.length > 1 && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeAnswer(idx)}
              >
                ✕
              </Button>
            )}
          </div>
        ))}

        <Button variant="link" onClick={addAnswer} className="mt-1">
          + Add Another Answer
        </Button>
      </div>

      {/* Save + Cancel */}
      <div className="d-flex gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          {question._id ? "Update Question" : "Add Question"}
        </Button>
      </div>
    </div>
  );
}
