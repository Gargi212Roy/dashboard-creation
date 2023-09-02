import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "./OAuth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials.user) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="sign-up-container">
        <h1 className="welcome-header">Welcome Back</h1>
        <form className="user-form" onSubmit={handleOnSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={handleOnChange}
            className="user-input btn"
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={handleOnChange}
              className="user-password btn"
            />
            {showPassword ? (
              <MdVisibilityOff
                onClick={() => setShowPassword(!showPassword)}
                size="22"
              />
            ) : (
              <MdVisibility
                onClick={() => setShowPassword(!showPassword)}
                size="22"
              />
            )}
          </div>
          <button className="submit-btn btn" type="submit">
            {" "}
            Sign In{" "}
          </button>
        </form>
        <div className="question">
          Don't have an account?{" "}
          <span>
            <Link to="/sign-up">Sign Up</Link>
          </span>
          <OAuth />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
