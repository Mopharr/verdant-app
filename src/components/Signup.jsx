/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "./images/forgetlogo.png";
import eye from "./images/eye.png";
import googleIcon from "./images/google-icon.png";
import Message from "./products/groceries/Message";
import Loader from "./products/groceries/Loader";
import { register } from "../actions/userActions";
import signupBarner from "./images/signup-barner.png";

const Signup = ({ history, location }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch({ history });

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push("/products/groceries");
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(firstname, lastname, email, phone, password));
      history.push("/");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <img src={signupBarner} alt="Signup Barner" />
        </div>

        <div className="col">
          <div className="p-5">
            <div className="d-flex justify-content-center">
              <div>
                <img src={Logo} alt="Brand Logo" />
              </div>
             
            </div>
            <div className="text-center text-dark my-5">
              <p style={{ fontSize: "20px", fontWeight: "500" }}>
                Create your account account to begin an amazing experience
              </p>
            </div>

            {message && <Message variant="danger">{message}</Message>}
            {loading && <Loader />}

            <form onSubmit={submitHandler} className="form">
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input
                  className="first-name"
                  type="text"
                  id="first-name"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input
                  className="last-name"
                  type="text"
                  id="last-name"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  className="email"
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  className="phone"
                  type="phone"
                  id="phone"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img src={eye} alt="eye" className="eye" />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  className="confirm-password"
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <img src={eye} alt="eye" className="eye" />
              </div>
              <div className="mb-5">
                <input
                  className="btn btn-primary btn-block btn-lg"
                  type="submit"
                  value="Sign Up"
                />
                {/* <input className="submit" type="submit" value="Create Account" /> */}
              </div>

              <div className="or-container">
                <div className="left-line" />
                <span>or</span>
                <div className="right-line" />
              </div>

              <div className="mt-5" />

              <button className="btn btn-outline-primary p-3 btn-block">
                <img src={googleIcon} alt="Google Icon" className="mr-1" />
                Google
              </button>

              <p className="no-account text-center">
                Already have account?
                {/* <LinkContainer to={redirect ? `/login?redirect=${redirect}` : "/login"}>  */}
                <LinkContainer to="/login">
                  <a>Login</a>
                </LinkContainer>
                {/* <a href="#">Create an account</a> */}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
