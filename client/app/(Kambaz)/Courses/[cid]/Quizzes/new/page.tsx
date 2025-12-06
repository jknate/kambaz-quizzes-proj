/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addQuestion } from "../questionsReducer";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function QuestionEditor() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [question, setQuestion] = useState<any>({
    title: "",
    type: "fill-in-the-blank",
    points: 10,
    question: "",
    possibleAnswers: [""],
    caseSensitive: false,
  });

  const handleSave = () => {
    // Filter out empty answers
    const filteredAnswers = question.possibleAnswers.filter(
      (answer: string) => answer.trim() !== ""
    );
    
    if (filteredAnswers.length === 0) {
      alert("Please add at least one correct answer");
      return;
    }

    if (!question.title.trim()) {
      alert("Please enter a question title");
      return;
    }

    if (!question.question.trim()) {
      alert("Please enter the question text");
      return;
    }
    
    const questionToSave = {
      ...question,
      possibleAnswers: filteredAnswers,
    };

    dispatch(addQuestion({ ...questionToSave, course: cid }));
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const addAnswer = () => {
    setQuestion({
      ...question,
      possibleAnswers: [...question.possibleAnswers, ""],
    });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = question.possibleAnswers.filter(
      (_: any, i: number) => i !== index
    );
    setQuestion({
      ...question,
      possibleAnswers: newAnswers,
    });
  };

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...question.possibleAnswers];
    newAnswers[index] = value;
    setQuestion({
      ...question,
      possibleAnswers: newAnswers,
    });
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-question-editor" className="p-4">
      <h2>Create New Fill in the Blank Question</h2>
      <hr />

      <Form>
        {/* Title */}
        <div className="mb-3">
          <Form.Label htmlFor="wd-question-title">
            <strong>Question Title</strong>
          </Form.Label>
          <Form.Control
            type="text"
            id="wd-question-title"
            value={question.title}
            onChange={(e) =>
              setQuestion({ ...question, title: e.target.value })
            }
            placeholder="Enter question title"
          />
        </div>

        {/* Points */}
        <div className="mb-3">
          <Form.Label htmlFor="wd-question-points">
            <strong>Points</strong>
          </Form.Label>
          <Form.Control
            type="number"
            id="wd-question-points"
            value={question.points}
            onChange={(e) =>
              setQuestion({
                ...question,
                points: parseInt(e.target.value) || 0,
              })
            }
            min="0"
          />
        </div>

        {/* Question Text with WYSIWYG placeholder */}
        <div className="mb-3">
          <Form.Label htmlFor="wd-question-text">
            <strong>Question Text</strong>
          </Form.Label>
          <p className="text-muted small">
            Use <code>_______</code> (7 underscores) to indicate where the blank should appear.
          </p>
          <Form.Control
            as="textarea"
            rows={4}
            id="wd-question-text"
            value={question.question}
            onChange={(e) =>
              setQuestion({ ...question, question: e.target.value })
            }
            placeholder="Enter your question here. Use _______ to indicate the blank."
          />
        </div>

        {/* Preview */}
        {question.question && (
          <div className="mb-3">
            <Form.Label>
              <strong>Preview</strong>
            </Form.Label>
            <Card className="p-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: question.question.replace(
                    /_______/g,
                    '<span class="bg-light border px-2 py-1" style="min-width: 100px; display: inline-block;">_______</span>'
                  ),
                }}
              />
            </Card>
          </div>
        )}

        {/* Possible Answers */}
        <div className="mb-3">
          <Form.Label>
            <strong>Possible Correct Answers</strong>
          </Form.Label>
          <p className="text-muted small">
            Add all possible correct answers. Students need to match at least one of these answers.
          </p>
          
          {question.possibleAnswers.map((answer: string, index: number) => (
            <Row key={index} className="mb-2 align-items-center">
              <Col xs={10}>
                <Form.Control
                  type="text"
                  value={answer}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  placeholder={`Answer ${index + 1}`}
                />
              </Col>
              <Col xs={2}>
                {question.possibleAnswers.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeAnswer(index)}
                    className="w-100"
                  >
                    <FaTrash />
                  </Button>
                )}
              </Col>
            </Row>
          ))}
          
          <Button
            variant="outline-primary"
            onClick={addAnswer}
            className="mt-2"
          >
            <FaPlus className="me-2" />
            Add Another Answer
          </Button>
        </div>

        {/* Case Sensitivity */}
        <div className="mb-4">
          <Form.Check
            type="checkbox"
            id="wd-case-sensitive"
            label="Case sensitive answers"
            checked={question.caseSensitive}
            onChange={(e) =>
              setQuestion({ ...question, caseSensitive: e.target.checked })
            }
          />
          <Form.Text className="text-muted">
            If checked, answers must match exactly (including capitalization).
          </Form.Text>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            size="lg" 
            onClick={handleSave}
            disabled={!question.title || !question.question || question.possibleAnswers.filter((a: string) => a.trim()).length === 0}
          >
            Save Question
          </Button>
        </div>
      </Form>
    </div>
  );
}