import React from "react";
import "./signup.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

function Signup() {
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
              />
              <input
                className="p-2 my-3"
                type="username"
                name="username"
                placeholder="Enter your Username"
              />

              <input
                className="p-2 my-3"
                type="password"
                name="password"
                placeholder="Enter your Password"
              />

              <button className="sign-btn" size="lg">
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
}

export default Signup;
