import styles from "./Navbar.module.css";
import { IoAtCircle } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.appicon}>
        <IoAtCircle />
        The TODO APP
      </div>
      <div className={styles.profile}>
        <button>Profile</button>
      </div>
    </div>
  );
};

export default Navbar;
