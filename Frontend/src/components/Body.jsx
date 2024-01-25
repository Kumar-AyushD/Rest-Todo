import Left from "./Left";
import Right from "./Right";
import styles from './Body.module.css';

const Body = () => {
  return (
  <div className={styles.container}>
    <Left />
    <Right />
  </div>)
}

export default Body;