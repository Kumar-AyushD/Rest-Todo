import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

const Signup = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localHost:3001/api/v1/register", Inputs)
      .then((res) => {
        if(res.data.message === 'User already exists.'){
          alert(res.data.message);
        }
        else{
          alert(res.data.message);
          setInputs({ email: "", username: "", password: "" });
        }
        history('/signin');
      });
  };
  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 bold mb-5 mx-1 mx-md-4 mt-4 head">
                Sign up
              </p>
              <input
                className="p-2 my-3"
                type="email"
                name="email"
                placeholder="Enter your Email"
                onChange={change}
                value={Inputs.email}
              />
              <input
                className="p-2 my-3"
                type="username"
                name="username"
                placeholder="Enter your Username"
                onChange={change}
                value={Inputs.username}
              />

              <input
                className="p-2 my-3"
                type="password"
                name="password"
                placeholder="Enter your Password"
                onChange={change}
                value={Inputs.password}
              />

              <button className="sign-btn" size="lg" onClick={submit}>
                Register
              </button>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Signup;
