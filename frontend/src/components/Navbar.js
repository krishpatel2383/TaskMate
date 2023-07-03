import { Link as ScrollLink} from "react-scroll";
import { Link as RouteLink } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import "../css/Navbar.css";
import React from "react";

const Navbar = () => {
  return (
    <div className="container-fluid">
      <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container-fluid">
          <ScrollLink class="navbar-brand" to="firstPage" smooth={true} duration={500} style={{cursor:"pointer"}}>
            <img src={logo} alt="logo" />
          </ScrollLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div class="navbar-nav">
              <ScrollLink
                class="nav-link text-white"
                to="getintouch"
                smooth={true}
                duration={500}
                style={{ cursor: "pointer" }}
              >
                Contact Us
              </ScrollLink>
              <ScrollLink
                class="nav-link text-white me-2"
                to="about"
                smooth={true}
                duration={500}
                style={{ cursor: "pointer" }}
              >
                About
              </ScrollLink>

              <RouteLink to="/login">
                <button type="button" className="btn login me-3">
                  Log In
                </button>
              </RouteLink>
              <RouteLink to="/signup">
                <button type="button" className="btn signup">
                  Sign Up for Free
                </button>
              </RouteLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
