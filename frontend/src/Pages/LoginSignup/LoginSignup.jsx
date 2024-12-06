import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from '../../axios'; // Make sure to use your axios instance
import './LoginSignup.css';

export const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    profile_image: null, 
    user_role_id: 3, 
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate(); 
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
        
        const signupData = new FormData();
        signupData.append('email', formData.email);
        signupData.append('password', formData.password);
        signupData.append('first_name', formData.first_name);
        signupData.append('last_name', formData.last_name);
        signupData.append('date_of_birth', formData.date_of_birth);
        signupData.append('user_role_id', formData.user_role_id); 
                
        // Only append profile_image if it exists
        if (formData.profile_image) {
          signupData.append('profile_image', formData.profile_image);
        }

        // Send POST request for signup
        const response = await axios.post('http://127.0.0.1:8000/api/user/registration', signupData, {
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
        const response = await axios.post('http://127.0.0.1:8000/api/user/login', loginData, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        
        setMessage(response.data.message );
        if (response.data.success){
          navigate('/instructor/dashboard');
          const token = response.data.token;
          document.cookie=`token=${token};path=/;secure;SameSite=none`;
        }
      }

      // Clear the form on success
      setFormData({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        profile_image: null,
        user_role_id: 3, // Reset to instructor after form submission
      });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  // Handle role change (student or instructor)
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData((prev) => ({
      ...prev,
      user_role_id: role === 'student' ? 3 : 2,
    }));
  };

  return (
    <div className="login-signup">
      <div className="LoginSignupContainer">
        <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
        <div className="LoginSignup-fields">
          {isSignup ? (
            <>
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                type="text"
                placeholder="First Name"
              />
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
              />
              <input
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                type="date"
                placeholder="Date of Birth"
              />
              <input
                name="profile_image"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                placeholder="Profile Picture"
              />
              <div className="role-selection">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.user_role_id === 3}
                    onChange={handleRoleChange}
                  />
                  Student
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="instructor"
                    checked={formData.user_role_id === 2}
                    onChange={handleRoleChange}
                  />
                  Instructor
                </label>
              </div>
            </>
          ) : null}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={handleSubmit}>
          {isSignup ? "Sign Up" : "Login"}
        </button>
        {error && <p className="error-message">{error}</p>}
        {isSignup ? (
          <p className="LoginSignup-login">
            Already have an account?{" "}
            <span onClick={() => setIsSignup(false)}>Login here</span>
          </p>
        ) : (
          <p className="LoginSignup-login">
            New here?{" "}
            <span onClick={() => setIsSignup(true)}>Sign up here</span>
          </p>
        )}
        <div className="loginSignup-agree">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};
