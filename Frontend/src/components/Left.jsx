import React, { useEffect, useState } from "react";
import "./left.css";
import ReactCalendar from "./ReactCalender";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

let _id = sessionStorage.getItem("id");

const Left = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // console.log(selectedDate);


  const handleDateChange = (date) => {
    setSelectedDate(date);
    setdata({ id: date.toLocaleDateString(), body: "" });
  };

  const [Inputs, setdata] = useState({ id: "", body: "" });
  const [Array, setArray] = useState([]);

  const change = (e) => {
    const { name, value } = e.target;
    setdata({ ...Inputs, [name]: value });
  };
  const Submit = async (e) => {
    e.preventDefault();
    try {
      if (Inputs.body === "") {
        toast.error("Body Can't be empty");
      } else {
        if (_id) {
          await axios
            .post("http://localhost:3001/api/v2/addOrUpdateTask", {
              id: Inputs.id,
              body: [{ task: Inputs.body, completed: false }],
              _id: _id,
            })
            .then((res) => {
              console.log(res);
            });
          setdata({ id: "", body: "" });
          toast.success("Your Task is Added");
        } else {
          toast.error("Log In first");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Your Task could not be saved");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`http://localHost:3001/api/v2/getTasks/${_id}`)
        .then((res) => setArray(res.data.list));
    };
    fetch();
  }, [Submit]);

  return (
    <div className="main">
      <ToastContainer />
      <div className="cards">
        <div className="calender">
          <ReactCalendar onDateChange={handleDateChange} />
        </div>
        <div className="date" value={selectedDate.toLocaleDateString()}>
          Date: {selectedDate.toLocaleDateString()}
        </div>
        <div className="addtask">
          <input
            id="textarea"
            type="text"
            placeholder="TASKS"
            name="body"
            className="m-2 p-2 todo-input"
            value={Inputs.body}
            onChange={change}
          />
          <button className="add-btn" onClick={Submit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Left;
// export {Submit};
