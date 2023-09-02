import React, { useState, useEffect, useRef } from "react";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import Options from "./Options";
import Data from "./Data";
import { getAuth } from "firebase/auth";
import "../stylesheets/contentBody.scss";
function ContentBody({ channelRef }) {
  const [isToggle, setIsToggle] = useState(true);
  const auth = getAuth();
  const username = auth.currentUser.displayName;

  useEffect(() => {
    channelRef.current.listen("handleToggle", (isToggle, meta) => {
      setIsToggle(isToggle);
    });
  }, []);

  const handleToggle = () => {
    channelRef.current.publish("handleToggle", !isToggle);
    setIsToggle(!isToggle);
  };

  return (
    <div className="body-container">
      <Options />
      <div>
        <div className="heading">
          Hey {username} -{" "}
          <span className="heading-section">here's what's happening</span>{" "}
          <button onClick={handleToggle}>
            {isToggle ? (
              <BsToggleOn
                style={{ color: "#2F82F7", cursor: "pointer" }}
                size={30}
              />
            ) : (
              <BsToggleOff
                style={{ color: "#2F82F7", cursor: "pointer" }}
                size={30}
              />
            )}
          </button>
          <span>DEMO DATA</span>
        </div>
        <Data channelRef={channelRef} />
      </div>
    </div>
  );
}

export default ContentBody;
