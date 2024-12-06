import React, { useState } from 'react';
import './AdminEvent.css';

export const AdminEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Created:', eventData);
    
    // Save the event to localStorage
    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];
    existingEvents.push(eventData);
    localStorage.setItem('events', JSON.stringify(existingEvents));

    // Trigger a storage event to notify other windows (student/instructor)
    window.dispatchEvent(new Event('storage'));

    alert('Event Created Successfully!');
    setEventData({ name: '', description: '', date: '' });
  };

  return (
    <div className="create-event-page">
      <div className="create-event-header">
        <h1>Create Event</h1>
        <p>Fill out the details below to create a new event.</p>
      </div>

      <form className="create-event-form" onSubmit={handleSubmit}>
        {/* Event Name */}
        <div className="form-group">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            placeholder="Enter event name"
            required
          />
        </div>

        {/* Event Description */}
        <div className="form-group">
          <label htmlFor="description">Event Description:</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Event Date */}
        <div className="form-group">
          <label htmlFor="date">Event Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            placeholder="MM-DD-YYYY"
            pattern="\d{2}-\d{2}-\d{4}"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Create Event</button>
      </form>
    </div>
  );
};
