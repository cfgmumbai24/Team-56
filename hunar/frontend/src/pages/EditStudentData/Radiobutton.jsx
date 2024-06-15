import React from 'react';
import './Radiobutton.css';


const RadioButtonGroup = ({ question, name, onResponseChange }) => {
  const handleChange = (e) => {
    onResponseChange(question, parseInt(e.target.value));
  };

  return (
    <div className="form-group">
      <label className="form-label">{question}</label>
      <div className="form-radio-group">
        <label>

          <input type="radio" name={name} value={5} onChange={handleChange} /> Strongly Agree
        </label>
        <label>
          <input type="radio" name={name} value={4} onChange={handleChange} /> Agree
        </label>
        <label>
          <input type="radio" name={name} value={3} onChange={handleChange} /> Neutral
        </label>
        <label>
          <input type="radio" name={name} value={2} onChange={handleChange} /> Disagree
        </label>
        <label>
          <input type="radio" name={name} value={1} onChange={handleChange} /> Strongly Disagree

        </label>
      </div>
    </div>
  );
};

export default RadioButtonGroup;
