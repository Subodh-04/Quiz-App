import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Question = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [username, setUsername] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      fetchQuestions(category);
    }
  }, [category]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/login");
    } else {
      const user = JSON.parse(loggedInUser);
      setUsername("");
      fetchUsername(user.userId);
    }
  }, [navigate]);

  const fetchQuestions = async (category) => {
    try {
      const response = await fetch(
        `https://quiz-server-z3xp.onrender.com/api/auth/questions/${category}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const modifiedData = data.map((question) => ({
        ...question,
        answers: {
          answer_a: question.answers.answer_a || null,
          answer_b: question.answers.answer_b || null,
          answer_c: question.answers.answer_c || null,
          answer_d: question.answers.answer_d || null,
        },
      }));
      setQuestions(modifiedData);
      localStorage.setItem("questions", JSON.stringify(modifiedData));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerSelect = (answerKey) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerKey,
    });
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleEndQuiz = () => {
    window.alert("Are you sure you want to end the quiz?");
    localStorage.removeItem("questions");
    navigate(`/topic`);
  };

  const fetchUsername = async (userId) => {
    try {
      const response = await fetch(
        `https://quiz-server-z3xp.onrender.com/api/auth/user/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setUsername(userData.username);
      } else {
        console.error("Error fetching username:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const handleSubmit = async () => {
    let totalPoints = 0;
    questions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      if (selectedAnswer && question.correct_answer === selectedAnswer) {
        totalPoints += 1;
      }
    });

    try {
      const resultData = {
        username: username,
        quizName: category,
        score: totalPoints,
      };

      const response = await fetch(
        "https://quiz-server-z3xp.onrender.com/api/auth/storeresult",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultData),
        }
      );

      if (response.ok) {
        console.log("Result stored successfully");
        console.log(resultData);
        localStorage.removeItem("questions");
        navigate(`/result/${totalPoints}`);
      } else {
        throw new Error("Error storing result");
      }
    } catch (error) {
      console.error("Error storing result:", error);
    }
  };

  const renderOption = (optionKey, optionText) => {
    if (!optionText) {
      return null;
    }
    return (
      <div
        className={`option-box mb-3 d-flex align-items-center justify-content-center border rounded ${
          selectedAnswers[currentQuestionIndex] === optionKey ? "selected" : ""
        }`}
        onClick={() => handleAnswerSelect(optionKey)}
        style={{ padding: "20px", cursor: "pointer" }}
      >
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={selectedAnswers[currentQuestionIndex] === optionKey}
          readOnly
          id={`option-${optionKey}`}
        />
        <label
          className="form-check-label m-0"
          htmlFor={`option-${optionKey}`}
          style={{ margin: 0 }}
        >
          {optionText}
        </label>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="question-container">
            <div className="question-nav-bar d-flex align-items-center justify-content-center flex-wrap">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`question-nav-item ${
                    index === currentQuestionIndex ? "active" : ""
                  } p-3 ms-2 me-2 border rounded text-center`}
                  onClick={() => handleQuestionSelect(index)}
                  style={{
                    backgroundColor:
                      index === currentQuestionIndex
                        ? "#865cda"
                        : "transparent",
                    color: index === currentQuestionIndex ? "white" : "black",
                    minWidth: "40px",
                  }}
                >
                  {index + 1}
                  {selectedAnswers[index] && (
                    <span className="ms-2">&#10003;</span>
                  )}
                </div>
              ))}
              <button
                className="btn btn-danger ms-lg-5 ms-md-4 ms-sm-5"
                onClick={handleEndQuiz}
              >
                End Quiz
              </button>
            </div>
            <h2 className="mt-4 mb-3 text-center">
              Question {currentQuestionIndex + 1}
            </h2>
            <div className="question-box p-3 mb-4">
              <p className="fs-4">
                {questions[currentQuestionIndex]?.question}
              </p>
            </div>
            <div className="row">
              <div className="col-md-6">
                {renderOption(
                  "answer_a",
                  questions[currentQuestionIndex]?.answers.answer_a
                )}
                {renderOption(
                  "answer_c",
                  questions[currentQuestionIndex]?.answers.answer_c
                )}
              </div>
              <div className="col-md-6">
                {renderOption(
                  "answer_b",
                  questions[currentQuestionIndex]?.answers.answer_b
                )}
                {renderOption(
                  "answer_d",
                  questions[currentQuestionIndex]?.answers.answer_d
                )}
              </div>
            </div>
            <div className="navigation-buttons mt-4 d-flex justify-content-between">
              <button
                className="btn btn-primary me-2"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                style={{ minWidth: "100px" }}
              >
                Previous
              </button>
              <button
                className="btn btn-primary me-2"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                style={{ minWidth: "100px" }}
              >
                Next
              </button>
            </div>
            {currentQuestionIndex === questions.length - 1 && (
              <div className="text-center mt-3">
                <button className="btn btn-success" onClick={handleSubmit}>
                  Submit Answers
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
