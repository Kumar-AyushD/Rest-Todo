import React, { useState } from "react";
import "./left.css";
import ReactCalendar from "./ReactCalender";
import "react-calendar/dist/Calendar.css";

const Left = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  return (
    <div className="main">
      <div className="cards">
        <div className="calender">
          <ReactCalendar onDateChange={handleDateChange} />
        </div>
        <div className="date">
          Date: {selectedDate.toLocaleDateString()}
        </div>
        <div className="addtask">
          <input
            type="text"
            placeholder="Title"
            className="m-2 p-2 todo-input"
            onClick={show}
          />
          <textarea
            id="textarea"
            type="text"
            placeholder="Description"
            className="m-2 p-2 todo-input"
          />
          <button className="add-btn">Add</button>
        </div>
      </div>
    </div>
  );
};

export default Left;
