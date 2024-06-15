import React, { useState } from 'react';

const AddGoatDetails = () => {
  const [houseNo, setHouseNo] = useState('');
  const [goatId, setGoatId] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [femaleKids, setFemaleKids] = useState('');
  const [maleKids, setMaleKids] = useState('');
  const [vaccinations, setVaccinations] = useState('');
  const [disease, setDisease] = useState(false); // Changed to boolean for Yes/No option
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with:', { houseNo, goatId, weight, height, femaleKids, maleKids, vaccinations, disease, date });
    // Additional logic to handle submission to backend or further processing
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Monthly Goat Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label} htmlFor="houseNo">House No:</label>
        <input
          type="text"
          id="houseNo"
          value={houseNo}
          onChange={(e) => setHouseNo(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label} htmlFor="goatId">Goat ID:</label>
        <input
          type="text"
          id="goatId"
          value={goatId}
          onChange={(e) => setGoatId(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label} htmlFor="weight">Weight (kg):</label>
        <input
          type="text"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label} htmlFor="height">Height (cm):</label>
        <input
          type="text"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label} htmlFor="femaleKids">Female Kids:</label>
        <input
          type="text"
          id="femaleKids"
          value={femaleKids}
          onChange={(e) => setFemaleKids(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label} htmlFor="maleKids">Male Kids:</label>
        <input
          type="text"
          id="maleKids"
          value={maleKids}
          onChange={(e) => setMaleKids(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label} htmlFor="vaccinations">Vaccinations:</label>
        <input
          type="text"
          id="vaccinations"
          value={vaccinations}
          onChange={(e) => setVaccinations(e.target.value)}
          style={styles.input}
          required
        />
        <div style={styles.checkboxContainer}>
          <label style={styles.label}>Diseases:</label>
          <div style={styles.checkboxInput}>
            <input
              type="checkbox"
              id="disease"
              checked={disease}
              onChange={(e) => setDisease(e.target.checked)}
            />
            <label htmlFor="disease" style={styles.checkboxLabel}>Yes</label>
          </div>
        </div>
        <label style={styles.label} htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '80%', // Adjusted width to fit better
    margin: '50px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  heading: {
    marginBottom: '20px',
    color: '#7B1F32',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center align form items
  },
  label: {
    marginBottom: '5px',
    textAlign: 'left',
    width: '100%',
    maxWidth: '300px', // Limit width of labels
  },
  input: {
    width: '100%',
    maxWidth: '300px', // Limit width of inputs
    padding: '8px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    maxWidth: '300px', // Limit width of button
    padding: '10px',
    backgroundColor: '#7B1F32',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '300px', // Limit width of checkbox container
    marginBottom: '15px',
  },
  checkboxInput: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: '5px',
  },
};

export default AddGoatDetails;
