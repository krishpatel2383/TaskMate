import React from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import About from "./About";
import Functionality from "./Functionality";
import Productivity from "./Productivity";
import Creator from "./Creator";
import GetInTouch from "./GetInTouch";
import "../css/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="home-container" id="firstPage">
        <HomePage />
      </div>
      <div className="content-container" id="about">
        <About />
      </div>
      <div className="content-container" id="functionality">
        <Functionality />
      </div>
      <div className="content-container" id="productivity">
        <Productivity />
      </div>
      <div className="content-container" id="creator">
        <Creator />
      </div>
      <div className="" id="getintouch">
        <GetInTouch />
      </div>
    </div>
  );
};

export default LandingPage;
