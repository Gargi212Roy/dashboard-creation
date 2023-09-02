import React from "react";
import Navbar from "./components/Navbar";
import ContentBody from "./components/ContentBody";
function DashboardContainer({ channelRef }) {
  return (
    <div>
      <Navbar channelRef={channelRef} />
      <ContentBody channelRef={channelRef} />
    </div>
  );
}

export default DashboardContainer;
