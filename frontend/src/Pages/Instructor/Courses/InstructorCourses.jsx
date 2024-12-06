import React, { useState } from 'react';
import './InstructorCourses.css';

const InstructorCourses = () => {
  const [expandedSection, setExpandedSection] = useState(null); // Track expanded section
  const [selectedAssessment, setSelectedAssessment] = useState(null); // Track selected assessment

  const course = {
    name: "Mathematics",
    sections: [
      {
        sectionLetter: "A",
        assessments: [
          { name: "Midterm Exam", students: [{ name: "John Doe", grade: 85 }, { name: "Jane Smith", grade: 45 }] },
          { name: "Final Exam", students: [{ name: "Alice Brown", grade: 55 }, { name: "Bob White", grade: 70 }] }
        ]
      },
      {
        sectionLetter: "B",
        assessments: [
          { name: "Midterm Exam", students: [{ name: "Tom Black", grade: 90 }, { name: "Emma Green", grade: 60 }] },
          { name: "Final Exam", students: [{ name: "Lucas Grey", grade: 50 }, { name: "Mia Blue", grade: 40 }] }
        ]
      }
    ]
  };

  const getGradeColor = (grade) => {
    return grade >= 50 ? "green-grade" : "red-grade"; // Color based on grade
  };

  const toggleSection = (sectionLetter) => {
    if (expandedSection === sectionLetter) {
      setExpandedSection(null); // Collapse the section if already expanded
      setSelectedAssessment(null); // Reset assessment when collapsing
    } else {
      setExpandedSection(sectionLetter); // Expand the section
      setSelectedAssessment(null); // Reset assessment when expanding
    }
  };

  const handleAssessmentClick = (assessment) => {
    setSelectedAssessment(assessment); // Set selected assessment
  };

  return (
    <div className="instructor-courses-page">
      <div className="instructor-courses-header">
        <h1>Manage {course.name}</h1>
        <p>Select a section and assessment to view students' grades.</p>
      </div>

      <div className="sections-container">
        {course.sections.map((section, index) => (
          <div
            key={index}
            className={`section-block ${expandedSection === section.sectionLetter ? 'expanded' : ''}`}
          >
            {/* Section Header */}
            <div className="section-header" onClick={() => toggleSection(section.sectionLetter)}>
              <h2>Section {section.sectionLetter}</h2>
              <span className="toggle-arrow">{expandedSection === section.sectionLetter ? "▲" : "▼"}</span>
            </div>

            {/* Section Content (Assessments) */}
            {expandedSection === section.sectionLetter && (
              <div className="section-content">
                <h3>Choose an Assessment</h3>
                <div className="assessments-list">
                  {section.assessments.map((assessment, index) => (
                    <button
                      key={index}
                      className={`assessment-button ${
                        selectedAssessment && selectedAssessment.name === assessment.name ? "active" : ""
                      }`}
                      onClick={() => handleAssessmentClick(assessment)}
                    >
                      {assessment.name}
                    </button>
                  ))}
                </div>

                {/* Students List */}
                {selectedAssessment && (
                  <div className="students-list">
                    <h3>Students and Grades for {selectedAssessment.name}</h3>
                    <ul>
                      {selectedAssessment.students.map((student, index) => (
                        <li key={index}>
                          <span>{student.name}: </span>
                          <span className={getGradeColor(student.grade)}>{student.grade}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;
