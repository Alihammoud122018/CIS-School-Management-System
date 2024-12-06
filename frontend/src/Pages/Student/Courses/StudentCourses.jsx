import React, { useState } from 'react';
import './StudentCourses.css';

const StudentCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      courseName: "Mathematics",
      instructor: "Dr. John Doe",
      schedule: "Mon, Wed, Fri - 10:00 AM to 11:30 AM",
      overallGrade: "A",
      exams: ["Midterm Exam", "Final Exam"],
      assessments: ["Assignment 1", "Assignment 2", "Project Submission"],
    },
    {
      id: 2,
      courseName: "History",
      instructor: "Prof. Jane Smith",
      schedule: "Tue, Thu - 12:00 PM to 1:30 PM",
      overallGrade: "B+",
      exams: ["Midterm Exam", "Final Exam"],
      assessments: ["Essay Submission", "Group Presentation"],
    },
    {
      id: 3,
      courseName: "English",
      instructor: "Ms. Emily Brown",
      schedule: "Mon, Wed - 1:00 PM to 2:30 PM",
      overallGrade: "F",
      exams: ["Midterm Exam", "Final Exam"],
      assessments: ["Grammar Test", "Book Report"],
    },
    {
      id: 4,
      courseName: "Physics",
      instructor: "Dr. Albert Newton",
      schedule: "Tue, Thu - 2:00 PM to 3:30 PM",
      overallGrade: "B",
      exams: ["Lab Exam", "Final Exam"],
      assessments: ["Experiment Report", "Quiz 1"],
    },
    {
      id: 5,
      courseName: "Sport",
      instructor: "Coach Mike Johnson",
      schedule: "Fri - 3:00 PM to 4:30 PM",
      overallGrade: "A-",
      exams: ["Fitness Test"],
      assessments: ["Team Evaluation", "Individual Skill Assessment"],
    },
    {
      id: 6,
      courseName: "Arts and Painting",
      instructor: "Ms. Clara Da Vinci",
      schedule: "Wed - 4:00 PM to 5:30 PM",
      overallGrade: "B-",
      exams: ["Art Showcase"],
      assessments: ["Sketch Submission", "Color Theory Assignment"],
    },
  ];

  const getGradeColor = (grade) => {
    if (["A", "A-", "B+", "B"].includes(grade)) return "green-grade";
    if (["B-", "C+"].includes(grade)) return "yellow-grade";
    if (["C", "C-", "D+", "D"].includes(grade)) return "orange-grade";
    return "red-grade"; // F
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBackClick = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="student-courses-page">
      <div className="student-courses-header">
        <h1>{selectedCourse ? selectedCourse.courseName : "Your Registered Courses"}</h1>
        <p>{selectedCourse ? "Overview and Exams/Assessments" : "Click on a course to view details"}</p>
      </div>

      <div className={`student-courses-container ${selectedCourse ? "slide-left" : ""}`}>
        {/* Courses List */}
        <div className="student-courses-list">
          {courses.map((course) => (
            <div
              key={course.id}
              className="student-course-card"
              onClick={() => handleCourseClick(course)}
            >
              <h2>{course.courseName}</h2>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Schedule:</strong> {course.schedule}</p>
            </div>
          ))}
        </div>

        {/* Course Details */}
        {selectedCourse && (
          <div className="student-course-details">
            <button className="back-button" onClick={handleBackClick}>Back</button>
            <div className={`grade-box ${getGradeColor(selectedCourse.overallGrade)}`}>
              Overall Grade: {selectedCourse.overallGrade}
            </div>
            <h3>Exams</h3>
            <ul>
              {selectedCourse.exams.map((exam, index) => (
                <li key={index}>{exam}</li>
              ))}
            </ul>
            <h3>Assessments</h3>
            <ul>
              {selectedCourse.assessments.map((assessment, index) => (
                <li key={index}>{assessment}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
