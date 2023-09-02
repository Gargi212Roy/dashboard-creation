import React from "react";
import home from "../assets/home.svg";
import chartBar from "../assets/chartBar.svg";
import chartSquareBlueBar from "../assets/chartSquareBlueBar.svg";
import chartSquareBar from "../assets/chartSquareBar.svg";
import user from "../assets/user.svg";
import users from "../assets/users.svg";
import "../stylesheets/options.scss";

function Options() {
  return (
    <div className="options-container">
      <div className="home">
        <img src={home} alt="" />
        <span>Dashboard</span>
      </div>
      <div className="analysis">Analysis</div>
      <div style={{ paddingTop: "25px" }}>
        <div className="home">
          <img src={chartBar} alt="" />
          <span>Posts</span>
        </div>
        <div className="home">
          <img src={user} alt="" />
          <span>Comments</span>
        </div>
        <div className="home">
          <img src={users} alt="" />
          <span>Albums</span>
        </div>
        <div className="home">
          <img src={chartSquareBar} alt="" />
          <span>Photo</span>
        </div>
        <div className="home">
          <img src={chartSquareBlueBar} alt="" />
          <span>Users</span>
        </div>
      </div>
    </div>
  );
}

export default Options;
