import React, { useState } from "react";
import { forgotPassword, loginUser } from "../services/userService";
import LoginImage from "../assets/images/loginImage.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (event) => {
    event.preventDefault();

    loginUser(email, password)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          // Redirect to the home page
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleForgetPassword = async (email) => {
    if (!email) {
      toast.warn("enter your email");
    } else {
      var sendingLink;
      try {
        sendingLink = toast.info("sending you reset link...", {
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
        });
        const response = await forgotPassword(email);
        if (response.status === 200) {
          toast.update(sendingLink, {
            render: "reset link sent",
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.update(sendingLink, {
          render: "error sending reset link",
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      }
    }
  };
  return (
    <div className="container">
      <div>
        <button onClick={() => navigate(`/`)} className="btn btn-primary mt-3">
          ⬅Home
        </button>
      </div>
      <div className="row text-center">
        <div className="col d-flex">
          <img src={LoginImage} alt="LoginImage" className="mx-auto my-5" />
        </div>
        <div className="col my-auto">
          <div className="row fw-bolder fs-1 mx-auto ms-2">Welcome Back!</div>
          <div className="row mx-2">Login to continue</div>
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
                <button type="submit" className="btn login px-4">
                  Login
                </button>
                <Link onClick={() => handleForgetPassword(email)}>
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
          <div className="row text-start mx-auto">
            New User?
            <Link
              to="/signup"
              className="col-md-2 link-underline link-underline-opacity-0"
              style={{ color: "#05ABC4" }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
