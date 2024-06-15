import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to GramUrja Foundation</h1>
      <div style={styles.buttons}>
        <Link to="/signup-organization" style={styles.button}>Sign Up as Organization</Link>
        <Link to="/signup-doctor" style={styles.button}>Sign Up as Doctor</Link>
        <Link to="/login-organization" style={styles.button}>Log In as Organization</Link>
        <Link to="/login-doctor" style={styles.button}>Log In as Doctor</Link>
      </div>
      <div style={styles.existingUser}>
        <p>Already a user? <Link to="/login">Login Here</Link></p>
        <p>New user? <Link to="/signup">Sign Up Here</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#7B1F32',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  existingUser: {
    marginTop: '20px',
  },
};

export default Home;
