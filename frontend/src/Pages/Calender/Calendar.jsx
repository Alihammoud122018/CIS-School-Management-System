import React from 'react';
import './Calendar.css';

const Calendar = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysInMonth = 30; 
  const firstDayOffset = 5;

  const dayColors = new Array(daysInMonth).fill('normal');
  dayColors[0] = 'holiday'; 
  dayColors[4] = 'assignment'; 
  dayColors[7] = 'exam'; 
  dayColors[10] = 'event'; 

  const renderCalendar = () => {
    const totalCells = daysInMonth + firstDayOffset;
    const rows = [];
    let dayIndex = 1;

    for (let i = 0; i < Math.ceil(totalCells / 7); i++) {
      const cols = [];
      for (let j = 0; j < 7; j++) {
        const cellIndex = i * 7 + j; 
        if (cellIndex < firstDayOffset) {
          cols.push(
            <div className="day-box empty" key={`empty-${i}-${j}`}></div>
          );
        } else if (dayIndex <= daysInMonth) {
          cols.push(
            <div className={`day-box ${dayColors[dayIndex - 1]}`} key={dayIndex}>
              {dayIndex}
            </div>
          );
          dayIndex++;
        } else {
          cols.push(
            <div className="day-box empty" key={`empty-${i}-${j}`}></div>
          );
        }
      }
      rows.push(
        <div className="calendar-row" key={i}>
          {cols}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <h2>Month Calendar</h2>
        <div className="calendar-header">
          {daysOfWeek.map((day, index) => (
            <div className="calendar-header-day" key={index}>
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-body">{renderCalendar()}</div>
        <div className="legend">
          <div className="legend-item">
            <span className="legend-box holiday"></span> Holiday
          </div>
          <div className="legend-item">
            <span className="legend-box assignment"></span> Assignment
          </div>
          <div className="legend-item">
            <span className="legend-box exam"></span> Exam
          </div>
          <div className="legend-item">
            <span className="legend-box event"></span> Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
