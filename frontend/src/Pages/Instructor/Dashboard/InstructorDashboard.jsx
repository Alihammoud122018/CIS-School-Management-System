import React from "react";
import { Link } from "react-router-dom";
import "./InstructorDashboard.css";

const InstructorDashboard = () => {
  const courses = [
    { name: "Web Development 101", students: 30 },
    { name: "Data Science Basics", students: 25 },
  ];

  const recentActivities = [
    "Assignment 1 - Web Development submitted by John Doe",
    "Quiz 3 graded for Data Science Basics",
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">EduManage</h2>
        <nav>
          <ul>
            <li>
              <Link to="/instructor/dashboard">
                <i className="fas fa-home"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/instructor/courses">
                <i className="fas fa-book"></i> Courses
              </Link>
            </li>
            <li>
              <Link to="/instructor/assignments">
                <i className="fas fa-tasks"></i> Assignments
              </Link>
            </li>
            <li>
              <Link to="/instructor/calendar">
                <i className="fas fa-calendar"></i> Calendar
              </Link>
            </li>
            <li>
              <Link to="/instructor/messages">
                <i className="fas fa-envelope"></i> Messages
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="content-wrapper">
        <main className="main-content">
          <header>
            <h1>Welcome, Instructor!</h1>
            <div className="header-right">
              <div className="notification">
                <i className="fas fa-bell"></i>
              </div>
              <div className="profile">
                <i className="fas fa-user-circle"></i>
              </div>
            </div>
          </header>

          <section className="overview">
            <div className="card">
              <h3>Total Courses</h3>
              <p>{courses.length}</p>
            </div>
            <div className="card">
              <h3>Total Students</h3>
              <p>{courses.reduce((total, course) => total + course.students, 0)}</p>
            </div>
            <div className="card">
              <h3>Pending Grading</h3>
              <p>6</p>
            </div>
          </section>

          <section className="courses">
            <h2>Your Courses</h2>
            <div className="course-list">
              {courses.map((course, index) => (
                <div className="course-card" key={index}>
                  <h3>{course.name}</h3>
                  <p>Students: {course.students}</p>
                  <Link to={`/instructor/courses`} className="btn">
                    Manage
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="recent-activity">
            <h2>Recent Activity</h2>
            <ul>
              {recentActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </section>
        </main>

        {/* Footer */}
        <footer className="dashboard-footer">
          <p>&copy; 2024 EduManage. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default InstructorDashboard;
