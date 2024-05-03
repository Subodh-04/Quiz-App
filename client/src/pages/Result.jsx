import { useParams,NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Result = () => {
  let { points } = useParams();
  const [scorePercentage, setScorePercentage] = useState(0);
  const [grade, setGrade] = useState("");
  const [gradeColor, setGradeColor] = useState("");

  useEffect(() => {
    const calculateScore = () => {
      const totalQuestions = 10; // Assuming there are 10 questions
      const correctAnswers = parseInt(points); // Assuming points are the number of correct answers
      const percentage = Math.round((correctAnswers / totalQuestions) * 100);
      setScorePercentage(percentage);

      let newGrade = "";
      let color = "";
      if (correctAnswers >= 10) {
        newGrade = "A+";
        color = "text-success";
      } else if (correctAnswers >= 7) {
        newGrade = "A";
        color = "text-success";
      } else if (correctAnswers >= 5) {
        newGrade = "B";
        color = "text-warning";
      } else if (correctAnswers >= 3) {
        newGrade = "C";
        color = "text-danger";
      } else {
        newGrade = "F";
        color = "text-danger";
      }
      setGrade(newGrade);
      setGradeColor(color);
    };

    calculateScore();
  }, [points]);

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-8 mx-auto text-center">
              <h4 className="divider">Quiz Information</h4>
            </div>
            <h2 className={`text-uppercase text-center fw-bold my-4 ${gradeColor}`}>
              Your Result
            </h2>
            <div className="row input-border input-round justify-content-center align-items-center">
              <div className="form-group col-sm-4 col-xl-4">
                <p className="text-center fs-5">
                  Score:{" "}
                  <span className={`${gradeColor} fs-5`}>{scorePercentage}%</span>
                  <br />
                  Total Questions: 10
                  <br />
                  Correct Answers: {points}
                </p>
              </div>
              <div className="form-group col-sm-4 col-xl-4">
                <p className="text-center fs-5">
                  Topic: <code>Linux</code>
                  <br />
                  Grade: <span className={`${gradeColor} fs-5`}>{grade}</span>
                  <br />
                  Final:{" "}
                  <span className={`${gradeColor} fs-5`}>
                    {grade === "F" ? "Failed" : "Passed"}
                  </span>
                </p>
              </div>
            </div>
            <NavLink className="d-flex justify-content-center pt-3 text-decoration-none" to={"/topic"}>Back To Topic Page</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
