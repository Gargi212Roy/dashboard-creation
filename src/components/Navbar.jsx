import React from "react";
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/companyLogo.svg";
import mail from "../assets/mail.svg";
import bell from "../assets/bell.svg";
import userPicture from "../assets/userPicture.svg";

import Search from "./Search";
import "../stylesheets/navbar.scss";

function Navbar({ channelRef }) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/log-out");
  };

  return (
    <div className="navbar-container">
      <div className="company-details">
        <img src={companyLogo} alt="" />
        <div>
          Saas<span>Den</span>
        </div>
      </div>
      <Search channelRef={channelRef} />
      <div className="notification-details">
        <div className="mail-info">
          <div>2</div>
          <img src={mail} alt="" />
        </div>
        <img src={bell} alt="" />
        <img
          style={{ cursor: "pointer" }}
          src={userPicture}
          alt=""
          onClick={handleLogOut}
        />
      </div>
    </div>
  );
}

export default Navbar;
