import React from 'react';
import './Radiobutton.css';

const RadioButtonGroup = ({ question, name }) => {
  return (
    <div className="form-group">
      <label className="form-label">{question}</label>
      <div className="form-radio-group">
        <label>
          <input type="radio" name={name} value="strongly-agree" /> Strongly Agree
        </label>
        <label>
          <input type="radio" name={name} value="agree" /> Agree
        </label>
        <label>
          <input type="radio" name={name} value="neutral" /> Neutral
        </label>
        <label>
          <input type="radio" name={name} value="disagree" /> Disagree
        </label>
        <label>
          <input type="radio" name={name} value="strongly-disagree" /> Strongly Disagree
        </label>
      </div>
    </div>
  );
};

export default RadioButtonGroup;
