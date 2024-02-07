import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Right.css";
import { MdDelete, MdDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import PopUp from "./PopUp";

let _id = sessionStorage.getItem("id");

function Right() {
  const [Arr, setArr] = useState([]);
  const [Isshowpop, setIsShowPop] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const showPopUp = (taskId) => {
    setSelectedTaskId(taskId);
    setIsShowPop(!Isshowpop);
  };

  const updateTask = async (item, tasks) => {
    const newData = {
      id: item._id,
      body: [{ task: tasks.task, completed: !tasks.completed }],
    };
    try {
      const response = await axios.put(
        `http://localHost:3001/api/v2/updateTask/${_id}/${tasks._id}`,
        newData
      );
      setIsShowPop(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const clean = (objectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete all tasks?");
    axios
      .delete(`http://localHost:3001/api/v2/deleteAllTasks/${objectId}`)
      .then((res) => {
        console.log("All tasks deleted");
      })
      .catch((error) => {
        console.log("Error deleting all tasks");
      });
  };

  const del = (taskId) => {
    axios
      .delete(`http://localHost:3001/api/v2/deleteOneTask/${_id}/${taskId}`)
      .then((res) => {
        console.log("Task deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = _id;
        const response = await axios.get(
          `http://localHost:3001/api/v2/getTasks/${userId}`
        );
        setArr(response.data.list);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [_id, Arr]);

  return (
    <div className="all">
      <h1 className="head">Your Tasks</h1>
      <div>
        {Arr &&
          Arr.map((item) => (
            <div key={item._id} className="boxs">
              <div className="dd">
                <div className="dates">{item.id}</div>
                <div className="deleteAll">
                  <MdDeleteSweep  onClick={()=>clean(item._id)}/>
                </div>
              </div>
              <div className="headsbody">
                <h5 className="cardtitle">
                  {item.body.map((tasks) =>
                    tasks.completed ? (
                      <div key={tasks._id} className="indtaskr">
                        <div className="titlcheck">
                          <p className="falsy">{tasks.task}</p>
                          <input
                            type="checkbox"
                            className="checkbox-round"
                            onClick={() => updateTask(item, tasks)}
                          />
                        </div>
                        <div className="deledit">
                          <MdDelete onClick={() => del(tasks._id)} />
                          <FaRegEdit onClick={() => showPopUp(tasks._id)} />
                          <div className="updater">
                          {selectedTaskId === tasks._id && Isshowpop ? (
                            <PopUp
                              id={item._id}
                              task={tasks.task}
                              taskId={tasks._id}
                              setIsShowPop={setIsShowPop}
                            />
                          ) : (
                            <></>
                          )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={tasks._id} className="indtask">
                        <div className="titlcheck">
                          <p className="righty">{tasks.task}</p>
                          <input
                            type="checkbox"
                            className="checkbox-round"
                            onClick={() => updateTask(item, tasks)}
                          />
                        </div>
                        <div className="deledit">
                          <MdDelete onClick={() => del(tasks._id)} />
                          <FaRegEdit onClick={() => showPopUp(tasks._id)} />
                          <div className="updater">{selectedTaskId === tasks._id && Isshowpop ? (
                            <PopUp
                              id={item._id}
                              task={tasks.task}
                              taskId={tasks._id}
                              setIsShowPop={setIsShowPop}
                            />
                          ) : (
                            <></>
                          )}</div>
                        </div>
                      </div>
                    )
                  )}
                </h5>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Right;
