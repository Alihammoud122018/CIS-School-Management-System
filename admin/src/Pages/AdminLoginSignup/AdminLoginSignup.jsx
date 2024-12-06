import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import adminAxios from '../../adminaxios'; 
import './AdminLoginSignup.css';

export const AdminLoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    profile_image: null, 
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize navigate

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profile_image: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (isSignup) {
        // For signup: Include file in FormData only if profile_image is set
        const signupData = new FormData();
        signupData.append('email', formData.email);
        signupData.append('password', formData.password);
        signupData.append('first_name', formData.first_name);
        signupData.append('last_name', formData.last_name);
        signupData.append('date_of_birth', formData.date_of_birth);

        // Only append profile_image if it exists
        if (formData.profile_image) {
          signupData.append('profile_image', formData.profile_image);
        }

        // Send POST request for signup
        const response = await adminAxios.post('http://127.0.0.1:8000/api/admin/registration', signupData, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setMessage(response.data.message || 'Signup successful!');
      } else {
        // For login
        const loginData = {
          email: formData.email,
          password: formData.password,
        };

        // Send POST request for login
        const response = await adminAxios.post('http://127.0.0.1:8000/api/admin/login', loginData, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        
        setMessage(response.data.message );
        if (response.data.success){
          navigate('/admin/dashboard');
          const token = response.data.token;
          document.cookie=`token=${token};path=/;secure'SameSite=none`;
        }

        
        // Redirect to the admin dashboard after successful login
        // Navigate to the dashboard page
      }

      // Clear the form on success
      setFormData({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        profile_image: null,
      });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="admin-login-signup">
      <h2>{isSignup ? 'Admin Signup' : 'Admin Login'}</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        {isSignup && (
          <>
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />

            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />

            <label>Date of Birth:</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />

            <label>Profile Image:</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleFileChange}
              accept="image/*"
            />
          </>
        )}

        <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
      </form>

      <p>
        {isSignup ? (
          <>
            Already have an account?{' '}
            <span
              onClick={() => setIsSignup(false)}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              Log in
            </span>
          </>
        ) : (
          <>
            Don’t have an account?{' '}
            <span
              onClick={() => setIsSignup(true)}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              Sign up
            </span>
          </>
        )}
      </p>
    </div>
  );
};
