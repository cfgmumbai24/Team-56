import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddGoatDetails from './components/AddGoatDetails'; // Import AddGoatDetails component
import ViewGoatDetails from './components/ViewGoatDetails'; // Import ViewGoatDetails component
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    console.log('handleLogin called with username:', username);
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleSignUp = (username) => {
    console.log('handleSignUp called with username:', username);
    setIsLoggedIn(true);
    setUsername(username);
  };

  // Function to render Dashboard if logged in, otherwise redirect to Login
  const redirectToDashboard = () => {
    if (isLoggedIn) {
      return <Dashboard username={username} onLogout={handleLogout} />;
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
        <Route path="/dashboard" element={redirectToDashboard()} />
        <Route path="/add-goat-details" element={<AddGoatDetails />} /> {/* Add route for AddGoatDetails */}
        <Route path="/view-goat-details" element={<ViewGoatDetails />} /> {/* Add route for ViewGoatDetails */}
      </Routes>
      <footer>
        <p>&copy; 2024 GramUrja Foundation</p>
      </footer>
    </Router>
  );
}

export default App;
