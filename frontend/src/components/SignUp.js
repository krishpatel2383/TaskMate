import React, { useState } from "react";
import { signupUser } from "../services/userService";
import signupImage from "../assets/images/signupImage.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    signupUser(email, password)
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          navigate("/home", { state: { email: response.data.email } });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const { errors } = error.response.data;
          Object.keys(errors).forEach((key) => {
            toast.error(errors[key]);
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="row text-center">
        <div className="col d-flex">
          <img src={signupImage} alt="signupImage" className="mx-auto my-5" />
        </div>
        <div className="col my-auto">
          <div className="row fw-bolder fs-1 mx-auto">Welcome to TaskMate!</div>
          <div className="row mx-auto my-4">
            <form
              className="text-start"
              style={{ maxWidth: "400px" }}
              onSubmit={handleFormSubmit}
            >
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control outline-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control outline-input"
                  id="exampleInputPassword1"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <button type="submit" className="btn signup px-4">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="row text-start mx-auto">
            Already have an account?
            <Link
              to="/login"
              className="col-7 link-underline link-underline-opacity-0"
              style={{ color: "#FC8655" }}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
