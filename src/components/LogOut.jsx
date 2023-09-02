import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function LogOut() {
  const navigate = useNavigate();
  const auth = getAuth();
  const handleLogOut = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <div className="logout" onClick={handleLogOut}>
      Logout
    </div>
  );
}

export default LogOut;
