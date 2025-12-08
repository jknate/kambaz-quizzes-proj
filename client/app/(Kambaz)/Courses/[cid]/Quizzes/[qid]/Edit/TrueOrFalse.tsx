"use client";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function TrueOrFalse({ question, onCancel, onSave, isEditing }: any) {
  const [title, setTitle] = useState<string>(question?.title || "");
  const [points, setPoints] = useState<number>(question?.points || 1);
  const [prompt, setPrompt] = useState<string>(question?.question || "");
  // Store as index: 0 = True, 1 = False (matching multiple-choice format)
  const [correct, setCorrect] = useState<number>(
    question?.correctAnswerIndex ?? 0
  );

  const handleSave = () => {
    onSave({
      ...question,
      title,
      points,
      question: prompt,
      type: "true-false",
      possibleAnswers: ["True", "False"],
      correctAnswerIndex: correct,
    });
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Control
          type="text"
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "40%" }}
        />

        <Form.Select value="true-false" disabled style={{ width: "200px" }}>
          <option>True / False</option>
        </Form.Select>

        <div className="d-flex align-items-center">
          <span className="me-2 fw-bold">pts:</span>
          <Form.Control
            type="number"
            style={{ width: "80px" }}
            value={points}
            min={0}
            onChange={(e) => setPoints(Number(e.target.value || 0))}
          />
        </div>
      </div>

      <div className="text-muted mb-2">
        Implement a True / False question — enter the prompt and select the
        correct answer.
      </div>

      <div className="mb-3">
        <label className="fw-bold mb-1">Question:</label>
        <Form.Control
          as="textarea"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="fw-bold">Correct Answer:</label>
        <Form.Select
          value={correct}
          onChange={(e) => setCorrect(Number(e.target.value))}
        >
          <option value={0}>True</option>
          <option value={1}>False</option>
        </Form.Select>
      </div>

      <div className="d-flex gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          {isEditing ? "Update Question" : "Add Question"}
        </Button>
      </div>
    </div>
  );
}
