import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProfile.css';

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };

  const token = getCookie("token");

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/self', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Format the date here
  const formattedDate = new Date(userData.date_of_birth).toLocaleDateString();

  return (
    <div className="profile-container">
      <div className="profile">
        <h2>Admin Profile</h2>

        {/* Personal Information Section */}
        <h3>Personal Information</h3>
        <div className="profile-section">
          <div className="profile-card">
            <label><strong>First Name:</strong></label>
            <input type="text" value={userData.first_name} disabled />
          </div>
          <div className="profile-card">
            <label><strong>Last Name:</strong></label>
            <input type="text" value={userData.last_name} disabled />
          </div>
          <div className="profile-card">
            <label><strong>Date of Birth:</strong></label>
            <input type="text" value={formattedDate} disabled />
          </div>
          <div className="profile-card">
            <label><strong>Email:</strong></label>
            <input type="text" value={userData.email} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
