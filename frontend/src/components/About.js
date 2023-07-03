import React from "react";
import AboutImage from "../assets/images/aboutImage.svg";
import "../css/About.css";
const About = () => {
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col">
          <img src={AboutImage} alt="AboutImage"></img>
        </div>
        <div className="col d-flex">
          <div className="fw-bolder about-text my-auto mx-auto">
            With Taskmate, you can easily manage all your tasks and to-do lists
            in one place.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
