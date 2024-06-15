import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const OrganizationDashboard = ({ username, onLogout }) => {
  const [data, setData] = useState({
    totalGoats: 0,
    goatsWithOwners: 0,
    homelessGoats: 0,
    parentGoats: 0,
    childrenGoats: 0,
  });

  useEffect(() => {
    // Fetch data from backend API and update state
    // Example API call, replace with actual API endpoint
    fetch('/api/goat-data')
      .then((response) => response.json())
      .then((data) => {
        setData({
          totalGoats: data.totalGoats,
          goatsWithOwners: data.goatsWithOwners,
          homelessGoats: data.homelessGoats,
          parentGoats: data.parentGoats,
          childrenGoats: data.childrenGoats,
        });
      })
      .catch((error) => console.error('Error fetching goat data:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="welcome-message">Welcome, {username}</h1>
        <button onClick={onLogout} className="logout-button">Log Out</button>
      </header>
      <div className="dashboard-content">
        <div className="stat-card">
          <h2>Total Goats</h2>
          <p>{data.totalGoats}</p>
        </div>
        <div className="stat-card">
          <h2>Goats with Owners</h2>
          <p>{data.goatsWithOwners}</p>
        </div>
        <div className="stat-card">
          <h2>Homeless Goats</h2>
          <p>{data.homelessGoats}</p>
        </div>
        <div className="stat-card">
          <h2>Parent Goats</h2>
          <p>{data.parentGoats}</p>
        </div>
        <div className="stat-card">
          <h2>Children Goats</h2>
          <p>{data.childrenGoats}</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
