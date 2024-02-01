import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Right.css";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import PopUp from "./PopUp";

let _id = sessionStorage.getItem("id");

function Right() {
  const [Arr, setArr] = useState([]);
  const [Isshowpop, setIsShowPop] = useState(false);
  const showPopUp = () => {
    setIsShowPop((Isshowpop) => !Isshowpop);
  };

  const del = (taskId) => {
    console.log(taskId);
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
      <div>
        {Arr &&
          Arr.map((item) => (
            <div key={item._id} className="boxs">
              <div className="dates">{item.id}</div>
              <div className="headsbody">
                <h5 className="cardtitle">
                  {item.body.map((tasks) => (
                    <div key={tasks._id} className="indtask">
                      <div className="titlcheck">
                        {tasks.task}
                        <input type="checkbox" />
                      </div>
                      <div className="deledit">
                        <MdDelete onClick={() => del(tasks._id)} />
                        <FaRegEdit onClick={() => showPopUp()} />
                        {Isshowpop ? (
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
                  ))}
                </h5>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Right;
