/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, Button, Form, Alert, Badge, Spinner } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FaPencilAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

export default function QuizPreviewPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const currentUser = useSelector((s: any) => s.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);

  // State to track user's answers
  const [userAnswers, setUserAnswers] = useState<{
    [questionIndex: number]: any;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Memoize questions to prevent dependency issues
  const questions = useMemo(() => quiz?.questions || [], [quiz]);

  // Fetch quiz from MongoDB
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/proxy/quizzes/${qid}`);
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    if (qid) {
      fetchQuiz();
    }
  }, [qid]);

  // Load previous attempt for students (not faculty)
  useEffect(() => {
    const loadAttempt = async () => {
      if (!currentUser || !qid || isFaculty) {
        setLoading(false);
        return;
      }

      try {
        // Get attempt count
        const countRes = await axios.get(
          `/api/proxy/quizAttempts/quiz/${qid}/user/${currentUser._id}/count`
        );
        setAttemptCount(countRes.data.count);

        // Get latest attempt
        const attemptRes = await axios.get(
          `/api/proxy/quizAttempts/quiz/${qid}/user/${currentUser._id}/latest`
        );

        if (attemptRes.data) {
          setLatestAttempt(attemptRes.data);
          setIsSubmitted(true);

          // Load answers from latest attempt
          const loadedAnswers: any = {};
          attemptRes.data.answers.forEach((ans: any, idx: number) => {
            loadedAnswers[idx] = ans.answer;
          });
          setUserAnswers(loadedAnswers);
        }
      } catch (error) {
        console.error("Error loading attempt:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAttempt();
  }, [currentUser, qid, isFaculty]);

  // Handle answer change for a specific question
  const handleAnswerChange = (questionIndex: number, answer: any) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer,
    });
  };

  // Calculate score and check correctness
  const { score, maxScore, results } = useMemo(() => {
    if (!isSubmitted) return { score: 0, maxScore: 0, results: [] };

    let earned = 0;
    let total = 0;
    const questionResults: any[] = [];

    questions.forEach((q: any, idx: number) => {
      const userAnswer = userAnswers[idx];
      const points = q.points || 0;
      total += points;

      let isCorrect = false;

      if (q.type === "multiple-choice") {
        // Check if selected answer matches correct answer index
        isCorrect = userAnswer === q.correctAnswerIndex;
      } else if (q.type === "fill-in-the-blank") {
        // Check if user answer matches any possible answer
        const possibleAnswers = q.possibleAnswers || [];
        if (q.caseSensitive) {
          isCorrect = possibleAnswers.includes(userAnswer);
        } else {
          isCorrect = possibleAnswers.some(
            (ans: string) =>
              ans.toLowerCase() === (userAnswer || "").toLowerCase()
          );
        }
      } else if (q.type === "true-false") {
        // Check if user answer matches correct answer
        isCorrect = userAnswer === q.correctAnswer;
      }

      if (isCorrect) {
        earned += points;
      }

      questionResults.push({
        question: q,
        userAnswer,
        isCorrect,
        points,
      });
    });

    return { score: earned, maxScore: total, results: questionResults };
  }, [isSubmitted, userAnswers, questions]);

  // Submit quiz
  const handleSubmit = async () => {
    // Check if all questions are answered
    const unanswered = questions.filter((_: any, idx: number) => {
      const answer = userAnswers[idx];
      return answer === undefined || answer === null || answer === "";
    });

    if (unanswered.length > 0) {
      const confirm = window.confirm(
        `You have ${unanswered.length} unanswered question(s). Do you want to submit anyway?`
      );
      if (!confirm) return;
    }

    setSubmitting(true);

    try {
      // For students, save to database
      if (!isFaculty && currentUser) {
        // Prepare answers array
        const answers = questions.map((q: any, idx: number) => ({
          question: q._id,
          answer: userAnswers[idx],
        }));

        // Submit attempt
        await axios.post(`/api/proxy/quizAttempts`, {
          quiz: qid,
          user: currentUser._id,
          attempt: attemptCount + 1,
          answers,
          score,
        });

        setAttemptCount(attemptCount + 1);
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Reset quiz for retake
  const handleRetake = () => {
    // Check if student can retake
    if (!isFaculty) {
      const maxAttempts = quiz?.howManyAttempts || 1;
      const allowMultiple = quiz?.multipleAttempts || false;

      if (!allowMultiple || attemptCount >= maxAttempts) {
        alert("You have exhausted all attempts for this quiz.");
        return;
      }
    }

    setUserAnswers({});
    setIsSubmitted(false);
    setLatestAttempt(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // Check if student has exceeded attempts
  const maxAttempts = quiz?.howManyAttempts || 1;
  const allowMultiple = quiz?.multipleAttempts || false;
  const attemptsExhausted = !isFaculty && !allowMultiple && attemptCount >= 1;
  const reachedLimit =
    !isFaculty && allowMultiple && attemptCount >= maxAttempts;

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: "900px" }}>
      {/* Header with Edit Quiz button (Faculty only) */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-semibold mb-0">
          {isFaculty ? "Quiz Preview" : "Take Quiz"}
        </h2>
        {isFaculty && (
          <Button
            variant="primary"
            className="d-flex align-items-center gap-2"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`)}
          >
            <FaPencilAlt size={14} />
            Edit Quiz
          </Button>
        )}
      </div>

      {/* Attempt Info for Students */}
      {!isFaculty && (
        <Alert variant="info" className="mb-3">
          <strong>Attempts:</strong> {attemptCount} /{" "}
          {allowMultiple ? maxAttempts : 1}
          {isSubmitted && latestAttempt && (
            <>
              <br />
              <strong>Last Submitted:</strong>{" "}
              {new Date(latestAttempt.submittedAt).toLocaleString()}
            </>
          )}
        </Alert>
      )}

      {/* Exhausted Attempts Warning */}
      {(attemptsExhausted || reachedLimit) && !isSubmitted && (
        <Alert variant="warning" className="mb-3">
          <strong>Notice:</strong> You have used all available attempts for this
          quiz. You can review your previous submission below.
        </Alert>
      )}

      {/* Results Summary (shown after submission) */}
      {isSubmitted && (
        <Alert
          variant={score === maxScore ? "success" : "warning"}
          className="mb-4"
        >
          <h4 className="fw-bold mb-2">Quiz Results</h4>
          <p className="mb-2 fs-5">
            Your Score: <strong>{score}</strong> / <strong>{maxScore}</strong>{" "}
            points
            {maxScore > 0 && (
              <span className="ms-2">
                ({Math.round((score / maxScore) * 100)}%)
              </span>
            )}
          </p>
          <p className="mb-0 text-muted">
            {isFaculty
              ? "This is a preview. Results are not saved to the database."
              : "Your answers and score have been saved."}
          </p>
        </Alert>
      )}

      {/* Quiz Info Card */}
      <Card className="mb-4 p-4">
        <h3 className="fw-bold mb-2">{quiz.title}</h3>
        {quiz.description && (
          <p className="text-muted mb-3">{quiz.description}</p>
        )}
        <div className="text-muted">
          <small>
            <strong>Total Points:</strong> {quiz.points || 0} |{" "}
            <strong>Questions:</strong> {questions.length} |{" "}
            <strong>Time Limit:</strong> {quiz.timeLimit} minutes
          </small>
        </div>
      </Card>

      {/* Questions */}
      {questions.map((question: any, idx: number) => {
        const result = isSubmitted ? results[idx] : null;
        const userAnswer = userAnswers[idx];

        return (
          <Card key={idx} className="mb-4 p-4">
            {/* Question Header */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <h5 className="fw-bold mb-0">Question {idx + 1}</h5>
                  {result && (
                    <Badge bg={result.isCorrect ? "success" : "danger"}>
                      {result.isCorrect ? (
                        <>
                          <FaCheckCircle className="me-1" />
                          Correct
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="me-1" />
                          Incorrect
                        </>
                      )}
                    </Badge>
                  )}
                </div>
                {question.title && (
                  <p className="text-muted mb-2">{question.title}</p>
                )}
              </div>
              <Badge bg="secondary" className="ms-2">
                {question.points} {question.points === 1 ? "pt" : "pts"}
              </Badge>
            </div>

            {/* Question Text */}
            <p className="mb-3">{question.question}</p>

            {/* Multiple Choice Questions */}
            {question.type === "multiple-choice" && (
              <div>
                {(question.possibleAnswers || []).map(
                  (answer: string, ansIdx: number) => {
                    const isSelected = userAnswer === ansIdx;
                    const isCorrectAnswer =
                      ansIdx === question.correctAnswerIndex;
                    const showCorrect = isSubmitted && isCorrectAnswer;
                    const showIncorrect =
                      isSubmitted && isSelected && !isCorrectAnswer;

                    return (
                      <Form.Check
                        key={ansIdx}
                        type="radio"
                        id={`q${idx}-a${ansIdx}`}
                        name={`question-${idx}`}
                        label={
                          <span>
                            {answer}
                            {showCorrect && (
                              <Badge bg="success" className="ms-2">
                                Correct Answer
                              </Badge>
                            )}
                            {showIncorrect && (
                              <Badge bg="danger" className="ms-2">
                                Your Answer
                              </Badge>
                            )}
                          </span>
                        }
                        checked={isSelected}
                        onChange={() =>
                          !isSubmitted && handleAnswerChange(idx, ansIdx)
                        }
                        disabled={isSubmitted}
                        className={`mb-2 ${
                          showCorrect ? "text-success fw-bold" : ""
                        } ${showIncorrect ? "text-danger" : ""}`}
                      />
                    );
                  }
                )}
              </div>
            )}

            {/* True/False Questions */}
            {question.type === "true-false" && (
              <div>
                {["true", "false"].map((option) => {
                  const isSelected = userAnswer === option;
                  const isCorrectAnswer = question.correctAnswer === option;
                  const showCorrect = isSubmitted && isCorrectAnswer;
                  const showIncorrect =
                    isSubmitted && isSelected && !isCorrectAnswer;

                  return (
                    <Form.Check
                      key={option}
                      type="radio"
                      id={`q${idx}-${option}`}
                      name={`question-${idx}`}
                      label={
                        <span>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                          {showCorrect && (
                            <Badge bg="success" className="ms-2">
                              Correct Answer
                            </Badge>
                          )}
                          {showIncorrect && (
                            <Badge bg="danger" className="ms-2">
                              Your Answer
                            </Badge>
                          )}
                        </span>
                      }
                      checked={isSelected}
                      onChange={() =>
                        !isSubmitted && handleAnswerChange(idx, option)
                      }
                      disabled={isSubmitted}
                      className={`mb-2 ${
                        showCorrect ? "text-success fw-bold" : ""
                      } ${showIncorrect ? "text-danger" : ""}`}
                    />
                  );
                })}
              </div>
            )}

            {/* Fill in the Blank Questions */}
            {question.type === "fill-in-the-blank" && (
              <div>
                <Form.Control
                  type="text"
                  placeholder="Enter your answer"
                  value={userAnswer || ""}
                  onChange={(e) =>
                    !isSubmitted && handleAnswerChange(idx, e.target.value)
                  }
                  disabled={isSubmitted}
                  className={
                    isSubmitted
                      ? result?.isCorrect
                        ? "border-success"
                        : "border-danger"
                      : ""
                  }
                />
                {isSubmitted && !result?.isCorrect && (
                  <div className="mt-2 text-muted small">
                    <strong>Correct answer(s):</strong>{" "}
                    {(question.possibleAnswers || []).join(", ")}
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        {!isSubmitted ? (
          <>
            <Button
              variant="danger"
              onClick={handleSubmit}
              size="lg"
              disabled={submitting || attemptsExhausted || reachedLimit}
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
              size="lg"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            {/* Retake button - only show if allowed */}
            {(isFaculty || (!attemptsExhausted && !reachedLimit)) && (
              <Button variant="primary" onClick={handleRetake} size="lg">
                Retake Quiz
              </Button>
            )}

            {/* Edit button - faculty only */}
            {isFaculty && (
              <Button
                variant="success"
                onClick={() =>
                  router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`)
                }
                size="lg"
                className="d-flex align-items-center gap-2"
              >
                <FaPencilAlt />
                Edit Quiz
              </Button>
            )}

            <Button
              variant="secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
              size="lg"
            >
              Back to Quiz
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
