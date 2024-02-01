import { useNavigate } from "react-router-dom";
import "./home.css"

const Home = () => {
  const navigate = useNavigate();
  const handleonMaketodo = () => {
    navigate('/todo');
  }
  return (
    <div className="home">
      <div className="container">
        <h1>
          <b>The todo App Organize Your Life<hr />One Task at a Time</b>
        </h1>
        <p>
          Life can get busy, but staying organized shouldn't be a challenge.
          todo App is here to help you manage your tasks effortlessly. Whether
          it's work, personal projects, or daily chores, our app simplifies your
          to-do list and makes productivity a breeze.
        </p>
        <button className="home-btn" onClick={handleonMaketodo}>Make to-do list</button>
      </div>
    </div>
  );
};

export default Home;
