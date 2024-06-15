import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ username }) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.welcome}>Welcome, {username}!</h1>
        <div style={styles.navBar}>
          <Link to="/add-goat-details" style={styles.navLinkButton}>Add Monthly Goat Details</Link>
          <Link to="/view-goat-details" style={styles.navLinkButton}>View Goat Details</Link>
        </div>
      </header>
      <main style={styles.mainContent}>
        {/* Additional content can be added here */}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  welcome: {
    margin: '10px 0',
  },
  navBar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  navLinkButton: {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#333',
    borderRadius: '5px',
    marginLeft: '10px',
    transition: 'background-color 0.3s ease',
  },
  mainContent: {
    marginTop: '100px', // Adjust to account for fixed header
    padding: '20px',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    padding: '10px 0',
  },
};

export default Dashboard;
