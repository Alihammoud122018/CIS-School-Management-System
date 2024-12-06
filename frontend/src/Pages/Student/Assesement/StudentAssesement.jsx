import React, {useState} from "react";
import "./StudentAssesement.css";

const StudentAssessment = () => {
  const [assessments] = useState([
    {
      id: 1,
      title: "Assignment 1 - Web Development",
      type:"Assignment",
      dueDate: "12/5/2024",
      description: "Complete the project on HTML and CSS basics.",
    },
    {
      id: 2,
      title: "Exam 2 - Data Science Basics",
      type: "Exam",
      dueDate: "11/30/2024",
      description: "A 10-question exam covering introductory concepts.",
    },
    {
      id: 3,
      title: "Final Exam - Software Engineering",
      type: "Exam",
      dueDate: "12/15/2024",
      description: "Final exam covering all course materials.",
    },  
  ]);

  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const handleAssessmenClick = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const closeModal = () => {
    setSelectedAssessment(null);
  };
  
  return (
    <div className="student-assessment-container">
      <h1>Assessments</h1>
      <div className="assessments-grid">
        {assessments.map((assessment) => (
          <div 
          key={assessment.id}
          className="assessment-box"
          onClick={() => handleAssessmenClick(assessment)}
          >
            <h2>{assessment.title}</h2>
            <p>Type: {assessment.type}</p>
            <p>Due Date: {assessment.dueDate}</p>
          </div>
        ))}
      </div>

      {selectedAssessment && (
        <div className="assessment-modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedAssessment.title}</h2>
            <p><strong>Type:</strong> {selectedAssessment.type}</p>
            <p><strong>Due Date:</strong> {selectedAssessment.dueDate}</p>
            <p><strong>Description:</strong> {selectedAssessment.description}</p>
            <button className="start-button">Start {selectedAssessment.type}</button>
          </div>
        </div>
        
      )}
      <br></br>
      <br />
      <br />

    </div>
  );
};

export default StudentAssessment;