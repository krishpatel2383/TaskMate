import React from "react";
import getintouchImage from "../assets/images/getintouchImage.svg";
import "../css/GetInTouch.css";

const GetInTouch = () => {
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col">
          <img src={getintouchImage} alt="getintouchImage" />
        </div>
        <div className="col my-auto mx-auto">
          <div className="fw-bolder fs-1 mt-5">Get In Touch</div>
          <div className="mt-5">
            <form
              className="text-start mx-auto"
              style={{ maxWidth: "400px" }}
              action="https://formsubmit.co/krish.taskmate@gmail.com"
              method="POST"
            >
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control outline-input"
                  id="inputName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail3" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control outline-input"
                  id="inputEmail3"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputSubject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  className="form-control outline-input"
                  id="inputSubject"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputMessage" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control outline-input"
                  name="message"
                  id="inputMessage"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
