import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OrganizationDashboard from './components/OrganizationDashboard'; // Import OrganizationDashboard component
import AddGoatDetails from './components/AddGoatDetails';
import ViewGoatDetails from './components/ViewGoatDetails';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('doctor'); // Default to doctor

  const handleLogin = (username, type) => {
    console.log('handleLogin called with username:', username, 'and type:', type);
    setIsLoggedIn(true);
    setUsername(username);
    setUserType(type); // Set user type based on login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserType('doctor'); // Reset user type on logout
  };

  const handleSignUp = (userData) => {
    console.log('handleSignUp called with userData:', userData);
    setIsLoggedIn(true);
    setUsername(userData.name);
    setUserType(userData.type); // Set user type based on sign up
  };

  // Function to render appropriate dashboard based on user type
  const renderDashboard = () => {
    if (isLoggedIn) {
      if (userType === 'organization') {
        return <OrganizationDashboard username={username} onLogout={handleLogout} />;
      } else {
        return <Dashboard username={username} onLogout={handleLogout} />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <div className="overlay"></div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={renderDashboard()} />
        <Route path="/add-goat-details" element={<AddGoatDetails />} />
        <Route path="/view-goat-details" element={<ViewGoatDetails />} />
      </Routes>

    </Router>
  );
}

export default App;
