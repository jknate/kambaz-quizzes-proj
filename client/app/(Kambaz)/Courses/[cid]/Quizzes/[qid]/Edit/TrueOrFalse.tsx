"use client";
import { Form, Button } from "react-bootstrap";

export default function TrueFalseQuestionEditor({ question, updateQuestion, onSave, onCancel }: any) {
  if (!question) return null;

  return (
    <div className="border p-3 mt-3 rounded">
      <h5>True / False Question</h5>

      
      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <Form.Control
          type="text"
          value={question.text ?? ""}
          onChange={(e) =>
            updateQuestion({ ...question, text: e.target.value })
          }
        />
      </Form.Group>

      
      <Form.Group className="mb-3">
        <Form.Label>Correct Answer</Form.Label>
        <Form.Select
          value={String(question.correctAnswer ?? "true")}
          onChange={(e) =>
            updateQuestion({ ...question, correctAnswer: e.target.value === "true" ? true : false })
          }
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </Form.Select>
      </Form.Group>

      
      <Form.Group className="mb-3" style={{ maxWidth: 160 }}>
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          value={question.points ?? 1}
          onChange={(e) =>
            updateQuestion({
              ...question,
              points: parseInt(e.target.value || "0", 10) || 0,
            })
          }
        />
      </Form.Group>

      <div className="d-flex gap-2 mt-2">
        <Button variant="primary" onClick={() => onSave?.(question)}>
          Save Question
        </Button>
        <Button variant="secondary" onClick={() => onCancel?.()}>
          Cancel
        </Button>
      </div>
    </div>
  );
}