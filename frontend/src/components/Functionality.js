import React from "react";
import functionImage from "../assets/images/functionImage.svg";
import "../css/Functionality.css";
const Functions = () => {
  return (
    <div className="container">
      <div className="row text-center ">
        <div className="col d-flex ">
          <div className="row my-auto mx-auto ">
            <div className="col fw-bolder head-text">
              Here's what you can do with Taskmate:
              <br />
              <br />
              <ul className="text-start">
                <li>View all your todos at a glance on the home page.</li>
                <li>Click on any todo to see its details.</li>
                <li>Update or delete todos as you complete them.</li>
                <li>Add new todos with title, description, and due date.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col">
          <img src={functionImage} alt="functionImage" className="functionIng"></img>
        </div>
      </div>
    </div>
  );
};

export default Functions;
