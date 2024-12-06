import React, { useState, useEffect } from 'react';
import adminAxios from '../../adminaxios';
import './AdminRequests.css';

export const AdminRequests = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState(null);
  const [students, setStudents] = useState([]);

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
  
  const fetchUsers = async (query) => {
    try {
      const response = await adminAxios.get('http://127.0.0.1:8000/api/admin/users', {
        params: { search: query },
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Assuming response.data contains the "users" array.
      if (response.data && response.data.users) {
        setStudents(response.data.users); // Set students with response data's 'users' array
      } else {
        console.error("Expected 'users' array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  useEffect(() => {
    fetchUsers(''); // Initial fetch
  }, []);
  
  const handleActionClick = (action) => {
    setSelectedAction(action);
    setIsSearchVisible(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    fetchUsers(searchQuery); // Fetch based on search query
  };

  const handleStudentSelect = async (student) => {
    try {
      const isActive = selectedAction === "Issue Warning" ? false : true; // Set is_active based on action
  
      const response = await adminAxios.put(
        `http://127.0.0.1:8000/api/admin/user-status/${student.id}`,
        {
          action: selectedAction,
          is_active: isActive, // Dynamically set is_active
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // If the request is successful, display an alert
      if (response.status === 200) {
        alert(`${selectedAction} action is successfully performed for ${student.first_name}`);
      } else {
        alert("Error: Unable to perform the action.");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Error performing the action.");
    }
  
    // Close the search bar after selecting the student
    setIsSearchVisible(false);
  };
  
  

  return (
    <div className="container">
      <header>
        <h1>Manage Members Actions</h1>
      </header>

      <section className="management-section">
        <div className="section">
          <h2>Enforce Warnings</h2>
          <button className="action-btn" onClick={() => handleActionClick("Issue Warning")}>Issue Warning to Member</button>
        </div>

        <div className="section">
          <h2>Approve/Decline Admissions</h2>
          <button className="action-btn" onClick={() => handleActionClick("View Pending Admissions")}>View Pending Admissions</button>
        </div>
      </section>

      {isSearchVisible && (
        <div className="search-container">
          <h3>Select a student to perform action: {selectedAction}</h3>
          <input
            type="text"
            placeholder="Search for a student..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button onClick={handleSearchClick} className="search-btn">Search</button>
          <div className="student-list">
            {students.length > 0 ? (
              students.map((student) => (
                <div
                  key={student.id}
                  className="student-item"
                  onClick={() => handleStudentSelect(student)}
                >
                  {student.first_name} {student.last_name}
                </div>
              ))
            ) : (
              <div>No students found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
