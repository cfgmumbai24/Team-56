import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [halfDoctorId, setHalfDoctorId] = useState('');
  const [email, setEmail] = useState('');
  const [villageName, setVillageName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (you may expand this as needed)
    if (!name || !password || !halfDoctorId || !email || !villageName) {
      alert('Please fill out all fields.');
      return;
    }

    // Construct user data object
    const userData = {
      name: name,
      password: password,
      half_doctor_id: halfDoctorId,
      email: email,
      village_name: villageName
    };

    // Call onSignUp function with user data
    onSignUp(userData);

    // Navigate to '/dashboard' after signup
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Sign Up</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label} htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label} htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label} htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label} htmlFor="villageName">Village Name:</label>
        <input
          type="text"
          id="villageName"
          value={villageName}
          onChange={(e) => setVillageName(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
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
  },
  label: {
    marginBottom: '5px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#7B1F32',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default SignUp;
