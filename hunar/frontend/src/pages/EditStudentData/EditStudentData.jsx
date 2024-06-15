import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import { data } from "./data"; // Assuming you will use a database or API instead
import RadioButtonGroup from "./Radiobutton";
import "./EditStudentData.css";

const questions = {
  "Feelings": [
    "I feel happy when I come to school.",
    "I feel safe in my classroom.",
    "I feel sad when my friends are not nice to me.",
    "I feel good about myself.",
    "I feel worried sometimes."
  ],
  "Relationships": [
    "I have friends to play with at school.",
    "I like to share with my classmates.",
    "I like to help others.",
    "My friends are kind to me.",
    "I have someone to talk to when I am sad."
  ],
  "Teacher Interaction": [
    "My teacher listens to me.",
    "I can talk to my teacher if I have a problem.",
    "My teacher cares about me.",
    "My teacher helps me when I don't understand something.",
    "My teacher makes me feel important."
  ]
};


const standards = [1,2,3,4,5];


const EditStudentData = () => {
  const { id } = useParams();
  const [name, setName] = useState('');

  const [standard, setStandard] = useState(1);
  const [literacyTestScore, setLiteracyTestScore] = useState('');
  const [numericalAbilityTestScore, setNumericalAbilityTestScore] = useState('');
  const [dateofTest,setdateofTest] = useState('')
  const [responses, setResponses] = useState({});
  


  useEffect(() => {
    const user = data.find((user) => user.id === parseInt(id));
    if (user) {
      setName(user.name);
    }
  }, [id]);
  const handleResponseChange = (question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const final_response = JSON.stringify(responses, null, 2)
    const formData = {
      name,
      standard,
      literacyTestScore,
      numericalAbilityTestScore,
      final_response
    };

    try {
      const response = await axios.post('https://localhost:5000/api/students', formData);
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  }

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
      <form className="form" onSubmit={handleSubmit}>
        <h2>Student Data</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
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
          <label htmlFor="standard" className="form-label">Standard</label>
          <select value={standard} onChange={handleStandardChange} className="form-select" required>
            <option value="" disabled>Select a Standard</option>
            {standards.map((std, index) => (
              <option key={index} value={std}>{std}</option>
            ))}
          </select>
        </div>
        <div className="form-group">

          <label htmlFor="dateofTest" className="form-label">Date of Test</label>
          <input
            type="date"
            id="numericalAbilityTestScore"
            value={dateofTest}
            onChange={handleDateofTestChange}
            className="form-input"
          />
        </div>
        <div className="form-group">

          <label htmlFor="literacyTestScore" className="form-label">Literacy Test Score</label>
          <input
            type="number"
            id="literacyTestScore"
            value={literacyTestScore}
            onChange={handleLiteracyTestScoreChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="numericalAbilityTestScore" className="form-label">Numerical Ability Test Score</label>
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
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>

      </>

  );
};

export default EditStudentData;
