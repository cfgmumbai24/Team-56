import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { data } from "./data"; // Assuming you will use a database or API instead
import RadioButtonGroup from "./Radiobutton";
import "./EditStudentData.css";
const questions = {

  Concentration: [
    "How attentive is the child in the lectures?",
    "How often does the child get distracted by external forces?",
    "How often does the child use his phone (if at all) during the lectures?",
    "To what extent can the child retain the clasroom lectures in memory?",
    "How often does the child clarify occurring doubts?"
  ],
  Reflectivity_and_other_factors: [
    "How frequently does the child respond to questions asked in the class?",
    "How well does the child respond to pressure?",
    "How well does the child respond to the teacher's instructions?",
    "How often does the child show interest in the subject matter?",
    "Is there an influence of family problems on the child's behaviour?"
  ],
};

const standards = [1, 2, 3, 4, 5];

const EditStudentData = () => {
  const { id } = useParams();
  console.log("id = ", id);
  const [name, setName] = useState("");

  const [standard, setStandard] = useState(1);
  const [literacyTestScore, setLiteracyTestScore] = useState(0);
  const [numericalAbilityTestScore, setNumericalAbilityTestScore] = useState(0);
  const [dateofTest, setdateofTest] = useState("");
  const [responses, setResponses] = useState({});
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState("");
  const [emoScore, setEmoScore] = useState(0.0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/student/${id}`
        );
        setStudentData(response.data); // Directly set the data
        console.log("Student response data:", response.data);
        console.log("Student data:", studentData); // Now contains fetched data
        console.log("Student name:", studentData.name); // Access data after setting
        setError("");
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Error fetching student data");
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const user = data.find((user) => user.id === parseInt(id));
    if (user) {
      setName(user.name);
    }
  }, [id]);
  const handleResponseChange = (question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question]: value,
    }));
    console.log("Responses : ", responses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const final_response = JSON.stringify(responses, null, 2);
    let sum = 0;
    for (const key in responses) {
      sum += parseInt(responses[key]);
    }
    const getTeacherId = localStorage.getItem("teacherId");
    const formData = {
      student_id: parseInt(id),
      teacher_id: parseInt(getTeacherId),
      date_of_assign: dateofTest,
      literacy_score: parseFloat(literacyTestScore),
      numeracy_score: parseFloat(numericalAbilityTestScore),
      socio_emotional_score: sum / 25.0,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/score",
        formData
      );
      console.log("Form Data:", formData);
      console.log("Server Response:", response.data);
      alert("Data submitted successfully");
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStandardChange = (e) => {
    setStandard(e.target.value);
  };

  const handleLiteracyTestScoreChange = (e) => {
    setLiteracyTestScore(e.target.value);
  };

  const handleNumericalAbilityTestScoreChange = (e) => {
    setNumericalAbilityTestScore(e.target.value);
  };

  const handleDateofTestChange = (e) => {
    setdateofTest(e.target.value);
  };

  return (
    <>
      <div>
        <div
          style={{
            fontSize: "1.5em",
            fontWeight: "bold",
            textDecoration: "none",
            backgroundColor: "#0277BD",
            padding: "1em",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2em",
          }}
        >
          Student Update{" "}
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="form-input"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="standard" className="form-label">
              Standard
            </label>
            <select
              value={standard}
              onChange={handleStandardChange}
              className="form-select"
              required
            >
              <option value="" disabled>
                Select a Standard
              </option>
              {standards.map((std, index) => (
                <option key={index} value={std}>
                  {std}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dateofTest" className="form-label">
              Date of Test
            </label>
            <input
              type="date"
              id="numericalAbilityTestScore"
              value={dateofTest}
              onChange={handleDateofTestChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="literacyTestScore" className="form-label">
              Literacy Test Score
            </label>
            <input
              type="number"
              id="literacyTestScore"
              value={literacyTestScore}
              onChange={handleLiteracyTestScoreChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="numericalAbilityTestScore" className="form-label">
              Numerical Ability Test Score
            </label>
            <input
              type="number"
              id="numericalAbilityTestScore"
              value={numericalAbilityTestScore}
              onChange={handleNumericalAbilityTestScoreChange}
              className="form-input"
            />
          </div>
          {Object.keys(questions).map((category, index) => (
            <div key={index}>
              <h3>{category}</h3>
              {questions[category].map((question, qIndex) => (
                <RadioButtonGroup
                  key={qIndex}
                  question={question}
                  name={`q${index}-${qIndex}`}
                  onResponseChange={handleResponseChange}
                />
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="form-button"
            style={{
              color: "white",
              backgroundColor: "#0277BD",
              maxWidth: "50dvw",
              marginLeft: "25%",
              marginTop: "3%",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditStudentData;
