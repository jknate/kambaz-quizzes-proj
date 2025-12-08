"use client";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../../questionsReducer";

export default function TrueOrFalse({ question, onCancel }: any) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>(question?.title ?? "");
  const [points, setPoints] = useState<number>(question?.points ?? 1);
  const [prompt, setPrompt] = useState<string>(question?.text ?? "");
  const [correct, setCorrect] = useState<boolean>(
    question?.correctAnswer === undefined ? true : !!question.correctAnswer
  );

  const onSave = () => {
    dispatch(
      updateQuestion({
        ...question,
        title,
        points,
        text: prompt,
        type: "TRUE_FALSE",
        correctAnswer: correct,
      })
    );
    alert("Question updated!");
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
        <Button variant="primary" onClick={onSave}>
          Save Question
        </Button>
      </div>
    </div>
  );
}
