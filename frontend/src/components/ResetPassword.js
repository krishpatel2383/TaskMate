import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/userService";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { email } = useParams();
  const token = queryParams.get("token");
  const [newPassword, setNewPassword] = useState("");

  const handleInputChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await resetPassword(email, token, newPassword);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const { errors } = error.response.data;
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key]);
        });
      } else {
        toast.error("password must be atleast 6 characters.");
      }
    }
  };

  return (
    <div className="container">
      <div className="fw-bolder fs-1 text-center my-5">Reset Password</div>
      <div className>
        <form
          className="m-auto"
          style={{ maxWidth: "400px" }}
          onSubmit={handleFormSubmit}
        >
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              disabled
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
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button type="submit" className="btn login px-4 m-auto">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
