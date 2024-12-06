import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to extract a cookie value by name
  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };

  const token = getCookie('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/self', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data. Please try again later.');
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

  // Format the joined date
  const formattedJoinedAt = new Date(userData.created_at).toLocaleDateString();

  return (
    <div className="profile-container">
      <div className="profile">
        <h2>User Profile</h2>

        <div className="profile-details">
          <div className="profile-field">
            <label><strong>First Name:</strong></label>
            <input type="text" value={userData.first_name} disabled />
          </div>
          <div className="profile-field">
            <label><strong>Last Name:</strong></label>
            <input type="text" value={userData.last_name} disabled />
          </div>
          <div className="profile-field">
            <label><strong>Email:</strong></label>
            <input type="text" value={userData.email} disabled />
          </div>
          <div className="profile-field">
            <label><strong>Date Joined:</strong></label>
            <input type="text" value={formattedJoinedAt} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
