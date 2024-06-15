import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Gram Hunar</h1>
      </header>
      <div className="button-container">
        <Link to="/login">
          <button className="home-button">Login as a Teacher</button>
        </Link>
        <Link to="/register">
          <button className="home-button">Register as a New Teacher</button>
        </Link>
      </div>
    </div>
  );
}
