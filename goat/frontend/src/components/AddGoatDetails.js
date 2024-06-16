import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddGoatDetails = () => {
  const [goat_id, setGoatId] = useState('');
  const [house_no, setHouseno] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [Fkids, setFemaleKids] = useState('');
  const [Mkids, setMaleKids] = useState('');
  const [vacA, setVacA] = useState(false);
  const [vacB, setVacB] = useState(false);
  const [vacC, setVacC] = useState(false);
  const [disease, setDisease] = useState(false);
  const [villagename, setVillagename] = useState('');
  const [remarks, setRemarks] = useState('');
  const [showRemarks, setShowRemarks] = useState(false);
  const [dataDate, setDataDate] = useState('');

  // Set the current date when the component mounts
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // yyyy-mm-dd
    setDataDate(formattedDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      goat_id,
      house_no,
      weight,
      height,
      Fkids,
      Mkids,
      vacA,
      vacB,
      vacC,
      disease,
      villagename,
      data_date: dataDate, // Include the date in the data object
    };

    try {
      const response = await axios.post('http://localhost:5000/api/mitra', data);
      if (response.status === 200) {
        setRemarks(`Data added successfully for Goat ID: ${goat_id} this month.`);
        setShowRemarks(true);
        setGoatId('');
        setHouseno('');
        setWeight('');
        setHeight('');
        setFemaleKids('');
        setMaleKids('');
        setVacA(false);
        setVacB(false);
        setVacC(false);
        setDisease(false);
        setVillagename('');
        setTimeout(() => {
          setShowRemarks(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error adding goat details:', error);
      setRemarks('Failed to add goat details. Please try again.');
      setShowRemarks(true);
      setTimeout(() => {
        setShowRemarks(false);
      }, 3000);
    }
  };

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1200px', // Increase the max-width to accommodate larger screens
      margin: '50px auto',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      boxSizing: 'border-box',
    },
    heading: {
      marginBottom: '20px',
      color: '#800000',
      textAlign: 'center',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 48%', // Use flex properties to allow wrapping and ensure two columns when possible
      minWidth: '280px', // Ensure minimum width to prevent too small columns
    },
    label: {
      marginBottom: '5px',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px', // Reduced margin for input boxes
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      fontSize: '14px', // Reduced font size for input boxes
    },
    button: {
      width: '100%', // Full width button
      padding: '8px', // Reduced padding for compact size
      backgroundColor: '#7B1F32',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '20px',
      fontSize: '16px', // Increased font size for better visibility
    },
    checkboxGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px', // Increased gap between checkboxes for better separation
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px', // Font size for checkboxes
    },
    remarksContainer: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#ffcccc',
      padding: '10px',
      borderRadius: '4px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    remarks: {
      color: '#800000',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Monthly Goat Details</h2>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="goat_id" style={styles.label}>Goat ID:</label>
            <input
              type="text"
              id="goat_id"
              value={goat_id}
              onChange={(e) => setGoatId(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="house_no" style={styles.label}>House No.:</label>
            <input
              type="text"
              id="house_no"
              value={house_no}
              onChange={(e) => setHouseno(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="weight" style={styles.label}>Weight (kg):</label>
            <input
              type="text"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="height" style={styles.label}>Height (m):</label>
            <input
              type="text"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="Fkids" style={styles.label}>Female Kids:</label>
            <input
              type="text"
              id="Fkids"
              value={Fkids}
              onChange={(e) => setFemaleKids(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="Mkids" style={styles.label}>Male Kids:</label>
            <input
              type="text"
              id="Mkids"
              value={Mkids}
              onChange={(e) => setMaleKids(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
  <label style={styles.label}>Vaccinations:</label>
  <div style={styles.checkboxGroup}>
  <div style={{...styles.checkboxLabel,maxWidth:"40%"}}>
    <label htmlFor="vacA" style={{ marginLeft: '10px' }}>VaccinationA</label>
      <input
        type="checkbox"
        id="vacA"
        checked={vacA}
        onChange={() => setVacA(!vacA)}
      />
      
    </div>
    <div style={{...styles.checkboxLabel,maxWidth:"40%"}}>
    <label htmlFor="vacB" style={{ marginLeft: '10px' }}>VaccinationB</label>
      <input
        type="checkbox"
        id="vacB"
        checked={vacB}
        onChange={() => setVacB(!vacB)}
      />
      
    </div>
    <div style={{...styles.checkboxLabel,maxWidth:"40%"}}>
    <label htmlFor="vacC" style={{ marginLeft: '10px' }}>VaccinationC</label>
      <input
        type="checkbox"
        id="vacC"
        checked={vacC}
        onChange={() => setVacC(!vacC)}
      />
     
    </div>
  </div>
</div>

          <div style={{...styles.formGroup }}  >
            <div style={{display:"flex", }}> <div>Disease : </div> <div>  <input
              type="checkbox"
              id="disease"
              checked={disease}
              onChange={(e) => setDisease(e.target.checked)}
              style={{ ...styles.input, width: 'auto' }}
            /> </div>  </div>
            
           
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="villagename" style={styles.label}>Village Name:</label>
            <input
              type="text"
              id="villagename"
              value={villagename}
              onChange={(e) => setVillagename(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="data_date" style={styles.label}>Date:</label>
            <input
              type="text"
              id="data_date"
              value={dataDate}
              readOnly // Read-only to prevent user input
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
      {showRemarks && (
        <div style={styles.remarksContainer}>
          <div style={styles.remarks}>
            <p>{remarks}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGoatDetails;
