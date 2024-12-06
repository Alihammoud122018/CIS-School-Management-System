import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Admin Panel</h1>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/admin/dashboard" className="navbar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/requests" className="navbar-link">Manage Requests</Link>
          </li>
          <li>
            <Link to="/admin/events" className="navbar-link">Events</Link>
          </li>
          <li>
            <Link to="/admin/profile" className="navbar-link">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
