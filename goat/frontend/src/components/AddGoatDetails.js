import React, { useState, useEffect } from 'react';

const AddGoatDetails = () => {
  const [goatId, setGoatId] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [femaleKids, setFemaleKids] = useState('');
  const [maleKids, setMaleKids] = useState('');
  const [vaccinations, setVaccinations] = useState([]);
  const [disease, setDisease] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [showRemarks, setShowRemarks] = useState(false);
  const [address, setAddress] = useState('');

  // Simulate fetching address from database based on goatId
  useEffect(() => {
    if (goatId) {
      fetchAddressFromDatabase(goatId);
    }
  }, [goatId]);

  // Simulated function to fetch address based on goatId
  const fetchAddressFromDatabase = async (id) => {
    try {
      // Replace with actual API call to fetch address based on goatId
      const response = await fetch("http://localhost:5000/api/goats/goat-address-details/${goatId}");
      if (response.ok) {
        const data = await response.json();
        setAddress(data.address); // Assuming API returns { address: "..." }
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Failed to fetch address');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate saving to database or backend
    setTimeout(() => {
      setRemarks(`Data added successfully for Goat ID: ${goatId} this month.`);
      setShowRemarks(true);
      // Clear form fields
      setGoatId('');
      setWeight('');
      setHeight('');
      setFemaleKids('');
      setMaleKids('');
      setVaccinations([]);
      setDisease(false);
      setTimeout(() => {
        setShowRemarks(false);
      }, 3000); // Hide the remarks after 3 seconds
    }, 1000);
  };

  const handleCheckboxChange = (vaccine) => {
    if (vaccinations.includes(vaccine)) {
      setVaccinations(vaccinations.filter((v) => v !== vaccine));
    } else {
      setVaccinations([...vaccinations, vaccine]);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Monthly Goat Details</h2>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} htmlFor="goatId">
            Goat ID:
          </label>
          <input
            type="text"
            id="goatId"
            value={goatId}
            onChange={(e) => setGoatId(e.target.value)}
            className="input"
            required
          />
          <div style={styles.address}>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              readOnly
              className="input"
            />
          </div>
          <label style={styles.label} htmlFor="weight">
            Weight (kg):
          </label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input"
            required
          />
          <label style={styles.label} htmlFor="height">
            Height (m):
          </label>
          <input
            type="text"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input"
            required
          />
          <label style={styles.label} htmlFor="femaleKids">
            Female Kids:
          </label>
          <input
            type="text"
            id="femaleKids"
            value={femaleKids}
            onChange={(e) => setFemaleKids(e.target.value)}
            className="input"
            required
          />
          <label style={styles.label} htmlFor="maleKids">
            Male Kids:
          </label>
          <input
            type="text"
            id="maleKids"
            value={maleKids}
            onChange={(e) => setMaleKids(e.target.value)}
            className="input"
            required
          />
          <label style={styles.label}>Vaccinations:</label>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={vaccinations.includes('Vaccination A')}
                onChange={() => handleCheckboxChange('Vaccination A')}
                className="checkbox"
              />
              <span className="checkboxText">Vaccination A</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={vaccinations.includes('Vaccination B')}
                onChange={() => handleCheckboxChange('Vaccination B')}
                className="checkbox"
              />
              <span className="checkboxText">Vaccination B</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={vaccinations.includes('Vaccination C')}
                onChange={() => handleCheckboxChange('Vaccination C')}
                className="checkbox"
              />
              <span className="checkboxText">Vaccination C</span>
            </label>
          </div>
          <div style={styles.checkboxContainer}>
            <label style={styles.label}>Disease:</label>
            <div style={styles.checkboxInput}>
              <input
                type="checkbox"
                id="disease"
                checked={disease}
                onChange={(e) => setDisease(e.target.checked)}
              />
              <label htmlFor="disease" style={styles.checkboxLabel}>
                Yes
              </label>
            </div>
          </div>
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
      {showRemarks && (
        <div style={styles.remarksContainer}>
          <div style={styles.remarks}>
            <p style={styles.remarksText}>{remarks}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    boxSizing: 'border-box',
  },
  heading: {
    marginBottom: '20px',
    color: '#800000',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginBottom: '5px',
    textAlign: 'left',
    width: '100%',
    maxWidth: '300px',
  },
  input: {
    width: '100%',
    maxWidth: '300px',
    padding: '8px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    maxWidth: '300px',
    padding: '10px',
    backgroundColor: '#7B1F32',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  checkboxInput: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '5px',
    cursor: 'pointer',
  },
  checkboxText: {
    marginLeft: '5px',
    userSelect: 'none',
  },
  address: {
    marginBottom: '15px',
  },
  remarksContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999',
  },
  remarks: {
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0,1)',
    textAlign: 'center',
  },
  remarksText: {
    margin: 0,
    color: '#333',
  },
};

export default AddGoatDetails;

