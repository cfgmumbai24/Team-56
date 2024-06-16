import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ username }) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.welcome}>Welcome, {username}!</h1>
      </header>
      <main style={styles.mainContent}>
        <div style={styles.navBar}>
          <Link to="/add-goat-details" style={styles.navLinkButton}>Add Monthly Goat Details</Link>
          <Link to="/view-goat-details" style={styles.navLinkButton}>View Goat Details</Link>
        </div>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2024 GramUrja Foundation</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    minHeight: '100vh', // Ensure the container takes full height

    boxSizing: 'border-box',

  },
  header: {
    backgroundColor: '#7B1F32',
    color: 'white',
    padding: '10px 0',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    margin: '10px 0',
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 160px)', // Adjust to account for fixed header and footer
    marginTop: '60px', // Adjust to account for fixed header
    color: '#FFFFFF',
  },
  navBar: {
    display: 'flex',
    justifyContent: 'center',
  },
  navLinkButton: {
    color: 'white',
    textDecoration: 'none',
    padding: '20px 40px', // Make buttons equal and sizable
    backgroundColor: '#7B1F32', // Remove grey background
    borderRadius: '5px',
    margin: '0 10px',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    padding: '10px 0',
    textAlign: 'center',
  },
};

export default Dashboard;
