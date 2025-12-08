"use client";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface TrueOrFalseProps {
  question: any;
  onSave: (q: any) => void;
  onCancel: () => void;
  onChangeType?: (type: string) => void;
}

export default function TrueOrFalseEditor({
  question,
  onSave,
  onCancel,
  onChangeType,
}: TrueOrFalseProps) {
  const [title, setTitle] = useState<string>(question?.title ?? "");
  const [points, setPoints] = useState<number>(question?.points ?? 1);
  const [prompt, setPrompt] = useState<string>(question?.question ?? "");
  const [correct, setCorrect] = useState<boolean>(
    question?.correctAnswer === undefined
      ? true
      : !!question.correctAnswer
  );

  const handleSave = () => {
    onSave({
      ...question,
      title,
      points,
      question: prompt,
      type: "true-false",
      correctAnswer: correct,
    });
  };

  return (
    <div className="container mt-3">
      {/* Title + type + points */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Control
          type="text"
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "40%" }}
        />

        {/* TYPE SWITCH DROPDOWN */}
        <Form.Select
          value="true-false"
          onChange={(e) => onChangeType?.(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="fill-in-the-blank">Fill in the Blank</option>
          <option value="true-false">True / False</option>
        </Form.Select>

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
          value={correct ? "true" : "false"}
          onChange={(e) => setCorrect(e.target.value === "true")}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </Form.Select>
      </div>

      <div className="d-flex gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Question
        </Button>
      </div>
    </div>
  );
}
