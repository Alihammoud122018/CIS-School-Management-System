import React from "react";
import "./StudentDashboard.css";

const Dashboard = () => {
  const tasks = [
    { title: "Submit Assignment 3", dueDate: "2024-11-27" },
    { title: "Math Quiz Preparation", dueDate: "2024-11-30" },
    { title: "Project Proposal Review", dueDate: "2024-12-01" },
  ];

  return (
    <div class="dashboard">
        <div class="welcome-section">
    <h1>Welcome, "PlaceHolder"!</h1>
    <p>“Fall 2024 Semester”</p>
  </div>
  
  <div class="content-section">
    <div class="deadlines">
      <h2>Upcoming Deadlines</h2>
      <ul>
      {tasks.map((task, index) => (
              <li key={index}>
                <span className="task-title">{task.title}</span>
                <span className="task-date">{task.dueDate}</span>
              </li>
            ))}
      </ul>
    </div>
    
    <div class="performance">
      <h2>Performance Summary</h2>
      <div class="performance-chart">
        <p>Grades: A+ | Assignments: 90% | Credits: 16</p>
      </div>
    </div>

    <div class="calendar">
      <h2>Week Calendar</h2>
      <div class="week-days">
        <div class="day">Mon</div>
        <div class="day">Tue</div>
        <div class="day">Wed</div>
        <div class="day">Thu</div>
        <div class="day">Fri</div>
        <div class="day">Sat</div>
        <div class="day">Sun</div>
      </div>
      <div class="week-days">
        <div class="day">
          <div class="day-box task">3</div>
        </div>
        <div class="day">
          <div class="day-box">4</div>
        </div>
        <div class="day">
          <div class="day-box">5</div>
        </div>
        <div class="day">
          <div class="day-box exam">6</div>
        </div>
        <div class="day">
          <div class="day-box">7</div>
        </div>
        <div class="day">
          <div class="day-box event">8</div>
        </div>
        <div class="day">
          <div class="day-box">9</div>
        </div>
      </div>
    </div>
    </div>
</div>
  );
};

export default Dashboard;
