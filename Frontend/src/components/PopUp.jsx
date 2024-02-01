import './popup.css'
import React, { useState } from "react";
import axios from "axios";
let _id = sessionStorage.getItem("id");

const PopUp = ({ id, task, taskId, setIsShowPop }) => {
  const [value, setValue] = useState(task);

  const handleOnchange = (e) => {
    setValue(e.target.value);
  };
  const newValue = {
    task: value, 
    completed: false  
  };

  const newData = {
    id: id,  
    body: [newValue]
  };

  const updateTask = async (req, res) => {
    try {
      const response = await axios.put(
        `http://localHost:3001/api/v2/updateTask/${_id}/${taskId}`,
        newData
      );
      setIsShowPop(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="popup">
      <input className='ini' type="text" onChange={handleOnchange} value={value} />
      <button className='ipdate-btn' onClick={updateTask} >Update</button>
    </div>
  );
};

export default PopUp;
