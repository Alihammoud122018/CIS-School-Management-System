import React, { useState, useEffect, useRef, useCallback } from "react";
import { Chart } from "chart.js/auto";
import adminAxios from "../../adminaxios"; // Axios instance
import "./AdminDashboard.css";

export const AdminDashboard = () => {
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [instructorSearchQuery, setInstructorSearchQuery] = useState("");
  const [filterYear] = useState("");
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const studentChartRef = useRef(null);
  const instructorChartRef = useRef(null);

  // Get cookie value utility function
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

  // Fetch users by role with useCallback for stable dependency
  const fetchUsersByRole = useCallback(
    async (roleId, roleSetter) => {
      try {
        const response = await adminAxios.get(
          `http://127.0.0.1:8000/api/admin/users-role/${roleId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data && response.data.users) {
          roleSetter(response.data.users);
        } else {
          console.error("Expected 'users' array but got:", response.data);
        }
      } catch (error) {
        console.error(`Error fetching users with role ${roleId}:`, error);
      }
    },
    [token]
  );

  // Create graph utility function with useCallback for stable dependency
  const createGraph = useCallback(
    (canvasId, userList, chartRef) => {
      const ctx = document.getElementById(canvasId);

      // Destroy previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Filter and organize data for the chart
      const filteredUsers = userList
        .filter((user) => !filterYear || user.year?.toString() === filterYear)
        .reduce((acc, user) => {
          const year = user.year ? user.year.toString() : "2024"; // Default year
          acc[year] = (acc[year] || 0) + 1;
          return acc;
        }, {});

      // Create a new chart instance
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(filteredUsers),
          datasets: [
            {
              label: `${canvasId === "studentGraph" ? "Students" : "Instructors"} per Year`,
              data: Object.values(filteredUsers),
              backgroundColor: canvasId === "studentGraph"
                ? "rgba(75, 192, 192, 0.6)"
                : "rgba(192, 75, 192, 0.6)",
              borderColor: canvasId === "studentGraph"
                ? "rgba(75, 192, 192, 1)"
                : "rgba(192, 75, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
          },
          scales: {
            x: { title: { display: true, text: "Year" } },
            y: { title: { display: true, text: "Count" } },
          },
        },
      });
    },
    [filterYear]
  );

  // Fetch data on component mount
  useEffect(() => {
    fetchUsersByRole(3, setStudents); // Role 3 = Students
    fetchUsersByRole(2, setInstructors); // Role 2 = Instructors
  }, [fetchUsersByRole]);

  // Create graphs whenever data or filterYear changes
  useEffect(() => {
    createGraph("studentGraph", students, studentChartRef);
    createGraph("instructorGraph", instructors, instructorChartRef);
  }, [students, instructors, filterYear, createGraph]);

  return (
    <div className="main-container">
      {/* Admin Dashboard Header */}
      <div className="admin-header">Admin Dashboard</div>

      {/* Dashboard Content */}
      <div className="dashboard-grid">
        {/* Student List */}
        <div className="list-container">
          <h2>Students</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name..."
              value={studentSearchQuery}
              onChange={(e) => setStudentSearchQuery(e.target.value)}
            />
          </div>
          <div className="grid-container">
            {students
              .filter((student) =>
                `${student.first_name} ${student.last_name}`
                  .toLowerCase()
                  .includes(studentSearchQuery.toLowerCase())
              )
              .map((student) => (
                <div key={student.id} className="user-item">
                  <span>
                    {student.first_name} {student.last_name}
                  </span>
                  <button
                    className={student.is_active ? "active-btn" : "inactive-btn"}
                  >
                    {student.is_active ? "Active" : "Inactive"}
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Instructor List */}
        <div className="list-container">
          <h2>Instructors</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name..."
              value={instructorSearchQuery}
              onChange={(e) => setInstructorSearchQuery(e.target.value)}
            />
          </div>
          <div className="grid-container">
            {instructors
              .filter((instructor) =>
                `${instructor.first_name} ${instructor.last_name}`
                  .toLowerCase()
                  .includes(instructorSearchQuery.toLowerCase())
              )
              .map((instructor) => (
                <div key={instructor.id} className="user-item">
                  <span>
                    {instructor.first_name} {instructor.last_name}
                  </span>
                  <button
                    className={
                      instructor.is_active ? "active-btn" : "inactive-btn"
                    }
                  >
                    {instructor.is_active ? "Active" : "Inactive"}
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid-graph">
          <div className="graph-container">
            <h2>Student Activity Over Time</h2>
            <canvas id="studentGraph" width="400" height="200"></canvas>
          </div>
          <div className="graph-container">
            <h2>Instructor Activity Over Time</h2>
            <canvas id="instructorGraph" width="400" height="200"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};
