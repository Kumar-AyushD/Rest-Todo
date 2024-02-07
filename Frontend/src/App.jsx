import About from "./components/about/About";
import './App.css'
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Navbar from "./components/header/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signup/Signin";
import Body from "./components/todo/Body";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import PopUp from "./components/PopUp";
function App() {
  const Dispatch = useDispatch();
  useEffect(()=>{
    const id = sessionStorage.getItem('id');
    if(id){
      Dispatch(authActions.login());
    }
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Body />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/update" element={<PopUp />} />
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
