/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Table, Form, Tabs, Tab } from "react-bootstrap";
import { updateQuiz } from "../../reducer";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import QuestionsList from "./QuestionsList";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import axios from "axios";import TrueOrFalse from "./TrueOrFalse";


export default function QuizEditorPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [tab, setTab] = useState("details");
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [editingQuestionIdx, setEditingQuestionIdx] = useState<number | null>(
    null
  );
  const [questionType, setQuestionType] = useState<
    "fill-in-the-blank" | "multiple-choice" | null
  >(null);
  const [loading, setLoading] = useState(true);

  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    questions: [],
  });

  // Fetch quiz with populated questions from MongoDB
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/proxy/quizzes/${qid}`);
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        alert("Failed to load quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (qid) {
      fetchQuiz();
    }
  }, [qid]);

  // Points = sum of question points
  const points = useMemo(() => {
    return (quiz.questions || []).reduce(
      (t: number, q: any) => t + (q.points || 0),
      0
    );
  }, [quiz.questions]);

  const handleSave = async () => {
    try {
      // Extract question IDs from the questions array
      const questionIds = quiz.questions.map((q: any) => q._id || q);

      // Update quiz in MongoDB with question IDs
      await axios.put(`/api/proxy/quizzes/${qid}`, {
        ...quiz,
        points,
        questions: questionIds,
      });

      // Update Redux store
      dispatch(updateQuiz({ ...quiz, points }));
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz. Please try again.");
    }
  };

  const handleSavePublish = async () => {
    try {
      // Extract question IDs from the questions array
      const questionIds = quiz.questions.map((q: any) => q._id || q);

      // Update quiz in MongoDB with question IDs
      await axios.put(`/api/proxy/quizzes/${qid}`, {
        ...quiz,
        points,
        published: true,
        questions: questionIds,
      });

      // Update Redux store
      dispatch(updateQuiz({ ...quiz, points, published: true }));
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quiz:", error);
      alert("Failed to save and publish quiz. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleEditQuestion = (question: any, idx: number) => {
    setEditingQuestionIdx(idx);
    setQuestionType(question.type);
    setShowQuestionEditor(true);
  };

  const handleDeleteQuestion = async (question: any) => {
    try {
      // Delete from MongoDB if it has an ID
      if (question._id) {
        await axios.delete(`/api/proxy/questions/${question._id}`);
      }

      // Remove from local state
      const updatedQuestions = (quiz.questions || []).filter(
        (q: any) => q !== question
      );

      // Calculate new points
      const newPoints = updatedQuestions.reduce(
        (t: number, q: any) => t + (q.points || 0),
        0
      );

      // Update local state
      const updatedQuiz = {
        ...quiz,
        questions: updatedQuestions,
        points: newPoints,
      };
      setQuiz(updatedQuiz);

      // Save quiz to MongoDB with updated question IDs
      const questionIds = updatedQuestions.map((q: any) => q._id || q);
      await axios.put(`/api/proxy/quizzes/${qid}`, {
        ...updatedQuiz,
        questions: questionIds,
      });

      // Update Redux store
      dispatch(updateQuiz(updatedQuiz));
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question. Please try again.");
    }
  };

  const handleAddQuestion = async (question: any) => {
    try {
      let savedQuestion: any;
      let updatedQuestions: any[];

      if (editingQuestionIdx !== null) {
        // Update existing question in MongoDB
        const existingQuestion = quiz.questions[editingQuestionIdx];
        if (existingQuestion._id) {
          // Question already exists in DB, update it
          const response = await axios.put(
            `/api/proxy/questions/${existingQuestion._id}`,
            { ...question, course: cid }
          );
          savedQuestion = response.data;
        } else {
          // Question doesn't have an ID yet, create it
          const response = await axios.post(`/api/proxy/questions`, {
            ...question,
            course: cid,
          });
          savedQuestion = response.data;
        }
        // Update in local state
        updatedQuestions = [...(quiz.questions || [])];
        updatedQuestions[editingQuestionIdx] = savedQuestion;
      } else {
        // Create new question in MongoDB
        const response = await axios.post(`/api/proxy/questions`, {
          ...question,
          course: cid,
        });
        savedQuestion = response.data;

        // Add to local state
        updatedQuestions = [...(quiz.questions || [])];
        updatedQuestions.push(savedQuestion);
      }

      // Calculate new points
      const newPoints = updatedQuestions.reduce(
        (t: number, q: any) => t + (q.points || 0),
        0
      );

      // Update local state
      const updatedQuiz = {
        ...quiz,
        questions: updatedQuestions,
        points: newPoints,
      };
      setQuiz(updatedQuiz);

      // Save quiz to MongoDB with updated question IDs
      const questionIds = updatedQuestions.map((q: any) => q._id || q);
      await axios.put(`/api/proxy/quizzes/${qid}`, {
        ...updatedQuiz,
        questions: questionIds,
      });

      // Update Redux store
      dispatch(updateQuiz(updatedQuiz));

      setShowQuestionEditor(false);
      setEditingQuestionIdx(null);
      setQuestionType(null);
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save question. Please try again.");
    }
  };

  const handleCancelEditor = () => {
    setShowQuestionEditor(false);
    setEditingQuestionIdx(null);
    setQuestionType(null);
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "950px" }}>
      <h2 className="fw-semibold mb-3">Quiz Editor</h2>

      <Tabs
        activeKey={tab}
        onSelect={(k) => setTab(k || "details")}
        className="mb-3"
      >
        {/* ------------------- DETAILS TAB ------------------- */}
        <Tab eventKey="details" title="Details">
          <Card className="p-4">
            {/* Title */}
            <Form.Group className="mb-3">
              <Form.Label>Quiz Title</Form.Label>
              <Form.Control
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={quiz.description}
                onChange={(e) =>
                  setQuiz({ ...quiz, description: e.target.value })
                }
              />
            </Form.Group>

            {/* EXACT QUIZ DETAILS LAYOUT (VERTICAL) */}
            <Table
              borderless
              className="align-middle"
              style={{ width: "100%" }}
            >
              <tbody>
                <EditorRow
                  label="Quiz Type"
                  input={
                    <Form.Select
                      value={quiz.quizType}
                      onChange={(e) =>
                        setQuiz({ ...quiz, quizType: e.target.value })
                      }
                    >
                      <option>Graded Quiz</option>
                      <option>Practice Quiz</option>
                      <option>Graded Survey</option>
                      <option>Ungraded Survey</option>
                    </Form.Select>
                  }
                />

                <EditorRow
                  label="Points"
                  input={<Form.Control type="number" value={points} disabled />}
                />

                <EditorRow
                  label="Assignment Group"
                  input={
                    <Form.Select
                      value={quiz.assignmentGroup}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          assignmentGroup: e.target.value,
                        })
                      }
                    >
                      <option>Quizzes</option>
                      <option>Exams</option>
                      <option>Assignments</option>
                      <option>Project</option>
                    </Form.Select>
                  }
                />

                <EditorRow
                  label="Shuffle Answers"
                  input={
                    <Form.Select
                      value={quiz.shuffleAnswers ? "Yes" : "No"}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          shuffleAnswers: e.target.value === "Yes",
                        })
                      }
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Select>
                  }
                />

                <EditorRow
                  label="Time Limit"
                  input={
                    <Form.Control
                      type="number"
                      value={quiz.timeLimit}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          timeLimit: parseInt(e.target.value),
                        })
                      }
                    />
                  }
                />

                <EditorRow
                  label="Multiple Attempts"
                  input={
                    <Form.Select
                      value={quiz.multipleAttempts ? "Yes" : "No"}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          multipleAttempts: e.target.value === "Yes",
                        })
                      }
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </Form.Select>
                  }
                />

                {quiz.multipleAttempts && (
                  <EditorRow
                    label="How Many Attempts"
                    input={
                      <Form.Control
                        type="number"
                        min={1}
                        value={quiz.howManyAttempts}
                        onChange={(e) =>
                          setQuiz({
                            ...quiz,
                            howManyAttempts: parseInt(e.target.value),
                          })
                        }
                      />
                    }
                  />
                )}

                <EditorRow
                  label="Show Correct Answers"
                  input={
                    <Form.Select
                      value={quiz.showCorrectAnswers}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          showCorrectAnswers: e.target.value,
                        })
                      }
                    >
                      <option>Immediately</option>
                      <option>After Due Date</option>
                      <option>Never</option>
                    </Form.Select>
                  }
                />

                <EditorRow
                  label="Access Code"
                  input={
                    <Form.Control
                      type="text"
                      value={quiz.accessCode}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          accessCode: e.target.value,
                        })
                      }
                    />
                  }
                />

                <EditorRow
                  label="One Question at a Time"
                  input={
                    <Form.Select
                      value={quiz.oneQuestionAtATime ? "Yes" : "No"}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          oneQuestionAtATime: e.target.value === "Yes",
                        })
                      }
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Select>
                  }
                />

                <EditorRow
                  label="Webcam Required"
                  input={
                    <Form.Select
                      value={quiz.webcamRequired ? "Yes" : "No"}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          webcamRequired: e.target.value === "Yes",
                        })
                      }
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </Form.Select>
                  }
                />

                <EditorRow
                  label="Lock Questions After Answering"
                  input={
                    <Form.Select
                      value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          lockQuestionsAfterAnswering: e.target.value === "Yes",
                        })
                      }
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </Form.Select>
                  }
                />
              </tbody>
            </Table>

            {/* Dates row */}
            <hr className="my-4" />

            <Table bordered>
              <thead>
                <tr className="fw-semibold text-center">
                  <th>Due</th>
                  <th>Available From</th>
                  <th>Until</th>
                </tr>
              </thead>

              <tbody>
                <tr className="text-center">
                  <td>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.dueDate || ""}
                      onChange={(e) =>
                        setQuiz({ ...quiz, dueDate: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.availableDate || ""}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          availableDate: e.target.value,
                        })
                      }
                    />
                  </td>

                  <td>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.untilDate || ""}
                      onChange={(e) =>
                        setQuiz({ ...quiz, untilDate: e.target.value })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </Table>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleSave}>
                Save
              </Button>
              <Button variant="success" onClick={handleSavePublish}>
                Save & Publish
              </Button>
            </div>
          </Card>
        </Tab>

        {/* ------------------- QUESTIONS TAB ------------------- */}
        <Tab eventKey="questions" title="Questions">
          <Card className="p-4">
            {!showQuestionEditor ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold mb-0">Questions Editor</h5>

                  <div className="d-flex gap-2">
                    {/* Question Type Dropdown */}
                    <Form.Select
                      value={questionType || ""}
                      onChange={(e) =>
                        setQuestionType(
                          e.target.value as
                            | "multiple-choice"
                            | "fill-in-the-blank"
                        )
                      }
                      style={{ width: "200px" }}
                    >
                      <option value="">Select Question Type</option>
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="fill-in-the-blank">
                        Fill in the Blank
                      </option>
                      <option value="true-false">True/False</option>
                    </Form.Select>

                    {/* Add Question Button */}
                    <Button
                      variant="primary"
                      disabled={!questionType}
                      onClick={() => {
                        setEditingQuestionIdx(null);
                        setShowQuestionEditor(true);
                      }}
                    >
                      + Add Question
                    </Button>
                  </div>
                </div>

                {/* Questions List */}
                <div className="mb-3">
                  <QuestionsList
                    questions={quiz.questions || []}
                    onEdit={(question) => {
                      const idx = quiz.questions.indexOf(question);
                      handleEditQuestion(question, idx);
                    }}
                    onDelete={handleDeleteQuestion}
                  />
                </div>

                {/* Total Points */}
                {quiz.questions && quiz.questions.length > 0 && (
                  <div className="alert alert-info mt-3 mb-0">
                    <strong>Total Points: {points}</strong>
                  </div>
                )}
              </>
            ) : questionType === "fill-in-the-blank" ? (
              <FillInTheBlankEditor
                question={
                  editingQuestionIdx !== null
                    ? quiz.questions[editingQuestionIdx]
                    : {
                        title: "",
                        points: 1,
                        type: "fill-in-the-blank",
                        question: "",
                        possibleAnswers: [""],
                        caseSensitive: false,
                      }
                }
                onSave={handleAddQuestion}
                onCancel={handleCancelEditor}
                isEditing={editingQuestionIdx !== null}
              />
            ) : questionType === "multiple-choice" ? (
              <MultipleChoiceEditor
                question={
                  editingQuestionIdx !== null
                    ? quiz.questions[editingQuestionIdx]
                    : {
                        title: "",
                        points: 1,
                        type: "multiple-choice",
                        question: "",
                        possibleAnswers: [""],
                        correctAnswerIndex: 0,
                      }
                }
                onCancel={handleCancelEditor}
                onSave={handleAddQuestion}
                isEditing={editingQuestionIdx !== null}
              />
            ) : questionType === "true-false" ? (
              <TrueOrFalse
                question={
                  editingQuestionIdx !== null
                    ? quiz.questions[editingQuestionIdx]
                    : {
                        title: "",
                        points: 1,
                        type: "true-false",
                        question: "",
                        possibleAnswers: ["True", "False"],
                        correctAnswerIndex: 0,
                      }
                }
                onCancel={handleCancelEditor}
                onSave={handleAddQuestion}
                isEditing={editingQuestionIdx !== null}
              />
            ) : (
              null
            )}
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

/* ------- VERTICAL ROW COMPONENT ------- */
function EditorRow({ label, input }: any) {
  return (
    <tr>
      <td
        align="right"
        style={{ width: "260px", fontWeight: 600, paddingRight: "20px" }}
      >
        {label}
      </td>
      <td>{input}</td>
    </tr>
  );
}