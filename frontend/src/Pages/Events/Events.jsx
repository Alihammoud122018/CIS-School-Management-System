import React, { useState } from 'react';
import './Events.css';

export const Events = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  
  const events = [
    { name: "First Day of Academic Year Party", date: "09-01", description: "Celebrate the start of a new academic journey with music, food, and fun activities." },
    { name: "Halloween Event", date: "10-31", description: "Dress up in costumes and enjoy spooky games, treats, and a haunted house experience." },
    { name: "Christmas Event", date: "12-25", description: "Celebrate the festive season with carols, gift exchanges, and a Christmas feast." },
    { name: "New Year Event", date: "01-01", description: "Welcome the new year with fireworks, music, and a countdown party." },
    { name: "End of Academic Year Trip", date: "06-15", description: "Join us for an adventurous trip to mark the conclusion of the academic year." },
];

  const toggleEvent = (event) => {
    setSelectedEvents((prev) =>
      prev.includes(event)
        ? prev.filter((e) => e !== event) 
        : [...prev, event] 
    );
  };

  const handleRegister = () => {
    setRegisteredEvents(selectedEvents);
    setSelectedEvents([]); 
  };

  const removeEvent = (event) => {
    setRegisteredEvents((prev) => prev.filter((e) => e !== event));
  };

  return (
    <div className="eventblock">
      <div className="col">
        <h2>Select Events</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <button
                className={`toggle-btn ${
                  selectedEvents.includes(event.name) ? "selected" : ""
                }`}
                onClick={() => toggleEvent(event.name)}
              >
                {event.name} - <span className="event-date">{event.date}</span>
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleRegister}>Register</button>
      </div>

      <div className="col">
        <h2>Registered Events</h2>
        {registeredEvents.length > 0 ? (
          registeredEvents.map((eventName, index) => {
            const event = events.find((e) => e.name === eventName);
            return (
              <div className="compact-event" key={index}>
                <div>
                  <strong>{event.name}</strong>
                  <p className="event-date">{event.date}</p>
                  <p className="event-description">{event.description}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeEvent(event.name)}
                >
                  Remove
                </button>
              </div>
            );
          })
        ) : (
          <p>No events registered yet.</p>
        )}
      </div>
    </div>
  );
};
