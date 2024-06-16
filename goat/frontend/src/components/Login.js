import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('doctor'); // Default to doctor
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(name, type); // Pass both name and type to onLogin callback
    navigate('/dashboard'); // Navigate to dashboard after login
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to sign up page
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonGroup}>
        <button
          style={type === 'doctor' ? styles.selectedButton : styles.button}
          onClick={() => setType('doctor')}
        >
          Log in as Doctor
        </button>
        <button
          style={type === 'organization' ? styles.selectedButton : styles.button}
          onClick={() => setType('organization')}
        >
          Log in as Organization
        </button>
      </div>
      <form onSubmit={handleLogin} style={styles.form}>
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
        <button type="submit" style={styles.loginButton}>Log In</button>
      </form>
      {type === 'doctor' && (
        <p style={styles.signUpLink} onClick={handleSignUpClick}>New user? Sign up</p>
      )}
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
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  button: {
    flex: '1',
    padding: '10px',
    backgroundColor: '#ccc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    textAlign: 'center',
  },
  selectedButton: {
    flex: '1',
    padding: '10px',
    backgroundColor: '#7B1F32', // Maroon color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    textAlign: 'center',
  },
  signUpLink: {
    color: '#7B1F32',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: '10px',
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
  loginButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#7B1F32',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Login;
