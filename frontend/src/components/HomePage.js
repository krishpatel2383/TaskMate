import React from "react";
import homeImage from "../assets/images/homeImage.svg";
import "../css/HomePage.css";

const HomePage = () => {
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col d-flex">
          <div className="text fw-bolder my-auto mx-auto">
            Get things done <br />
            with <span className="text-task">Task</span>
            <span className="text-mate">Mate</span>.
          </div>
        </div>
        <div className="col">
          <img src={homeImage} alt="homeImage"></img>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
