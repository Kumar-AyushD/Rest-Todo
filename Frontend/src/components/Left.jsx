import React, { useState } from 'react';
import styles from './Left.module.css';
import ReactCalendar from './ReactCalender'
import 'react-calendar/dist/Calendar.css';

const Left = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.main}>
      <div className={styles.calender}>
        <ReactCalendar onDateChange={handleDateChange} />
      </div>
      <div className={styles.date}><span>Date: {selectedDate.toLocaleDateString()}</span></div>
      <div className={styles.addtask}>
        <form>
          <input placeholder='Add a Task' />
          <button className='btn btn-success'>Add</button>
        </form>
      </div>
    </div>
  );
};

export default Left;
