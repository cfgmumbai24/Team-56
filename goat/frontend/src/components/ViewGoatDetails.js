import React, { useState } from 'react';

const ViewGoatDetails = () => {
  const [goatId, setGoatId] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [goatDetails, setGoatDetails] = useState(null); // State to hold fetched goat details

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate fetching data from backend or local storage based on goatId and houseNo
    // Replace with actual API call or data retrieval logic
    const fetchedGoatDetails = {
      goatId: goatId,
      houseNo: houseNo,
      weight: '50',
      height: '70',
      femaleKids: '3',
      maleKids: '2',
      vaccinations: 'Vaccination A, Vaccination B',
      disease: true,
      date: '2024-06-21',
    };
    setGoatDetails(fetchedGoatDetails);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Goat Details</h2>
      <form onSubmit={handleSearch} style={styles.form}>
        <label style={styles.label} htmlFor="goatId">Goat ID:</label>
        <input
          type="text"
          id="goatId"
          value={goatId}
          onChange={(e) => setGoatId(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label} htmlFor="houseNo">House No:</label>
        <input
          type="text"
          id="houseNo"
          value={houseNo}
          onChange={(e) => setHouseNo(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>
      {goatDetails && (
        <div style={styles.detailsContainer}>
          <h3 style={styles.detailsHeading}>Details for Goat ID: {goatDetails.goatId}</h3>
          <p><strong>House No:</strong> {goatDetails.houseNo}</p>
          <p><strong>Weight:</strong> {goatDetails.weight} kg</p>
          <p><strong>Height:</strong> {goatDetails.height} cm</p>
          <p><strong>Female Kids:</strong> {goatDetails.femaleKids}</p>
          <p><strong>Male Kids:</strong> {goatDetails.maleKids}</p>
          <p><strong>Vaccinations:</strong> {goatDetails.vaccinations}</p>
          <p><strong>Disease:</strong> {goatDetails.disease ? 'Yes' : 'No'}</p>
          <p><strong>Date:</strong> {goatDetails.date}</p>
        </div>
      )}
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
    marginBottom: '20px',
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
  },
  detailsContainer: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
  },
  detailsHeading: {
    color: '#7B1F32',
    marginBottom: '10px',
  },
};

export default ViewGoatDetails;
