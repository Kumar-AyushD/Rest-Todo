import Left from "../Left";
import Right from "../Right";
import styles from "./Body.module.css";

const Body = () => {
  return (
    <div className={styles.todo}>
      <Left />
      <Right />
      {/* <div className="todo-main container d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column w-25">
          <input type="text" placeholder="Title" className="my-3 p-2" />
          <textarea type="text" placeholder="Body" className="p-2" />
        </div>
      </div> */}
    </div>
  );
};

export default Body;
