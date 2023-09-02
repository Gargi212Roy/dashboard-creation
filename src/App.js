import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { useRef, useEffect } from "react";
import pieSocket from "./pieSocket.config";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import DashboardContainer from "./DashboardContainer";
import LogOut from "./components/LogOut";

function App() {
  const channelRef = useRef();
  useEffect(() => {
    pieSocket.subscribe("dashboard-creation").then((channel) => {
      channelRef.current = channel;
    });
  }, []);

  return (
    <Router>
      <Routes>
        <>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route
              path="/dashboard"
              element={<DashboardContainer channelRef={channelRef} />}
            />
          </Route>
          <Route path="/log-out" element={<LogOut />} />
        </>
      </Routes>
    </Router>
  );
}

export default App;
