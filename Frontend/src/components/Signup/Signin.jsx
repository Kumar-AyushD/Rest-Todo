import React from "react";
import "./signup.css";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Signup = () => {
  const Dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localHost:3001/api/v1/signin", Inputs)
      .then((res) => {
        sessionStorage.setItem("id", res.data.others._id);
        Dispatch(authActions.login());
        history('/todo');
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
                Sign In
              </p>
              <input
                className="p-2 my-3"
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={Inputs.email}
                onChange={change}
              />

              <input
                className="p-2 my-3"
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={Inputs.password}
                onChange={change}
              />

              <button className="sign-btn" size="lg" onClick={submit}>
                SignIn
              </button>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                fluid
                alt="Sample image"
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
