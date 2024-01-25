import React, { useState } from 'react';
import Calendar from 'react-calendar';

const ReactCalendar = ({ onDateChange }) => {
  const [currentDate, changeDate] = useState(new Date());

  const handleDateChange = (date) => {
    changeDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={currentDate}></Calendar>
    </div>
  );
}

export default ReactCalendar;
