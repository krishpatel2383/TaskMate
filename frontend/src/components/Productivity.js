import React from "react";
import ProductivityImage from "../assets/images/productivityImage.svg";

import { Link as RouteLink } from "react-router-dom";
const Productivity = () => {
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col">
          <img src={ProductivityImage} alt="ProductivityImage"></img>
        </div>
        <div className="col d-flex">
          <div className="fw-bolder fs-3 my-auto mx-auto">
            Taskmate helps you stay on top of your tasks and increase your
            productivity. So why wait? Sign up today and start managing your
            to-dos like a pro!
            <br />
            <RouteLink to="/signup">
              <button type="button" className="btn signup">
                Sign Up for Free
              </button>
            </RouteLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productivity;
