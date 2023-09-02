import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import OAuth from "./OAuth";

import "../stylesheets/signUp.scss";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = userData;

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const userDataCopy = { ...userData };

      delete userDataCopy.password;
      userDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), userDataCopy);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="sign-up-container">
        <h1 className="welcome-header">Welcome Back</h1>
        <form className="user-form" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={handleOnChange}
            className="user-input btn"
          />
          <input
            type="name"
            placeholder="Enter your name"
            id="name"
            value={name}
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
            Sign Up{" "}
          </button>
        </form>
        <div className="question">
          Have an account?{" "}
          <span>
            <Link to="/">Sign In</Link>
            <OAuth />
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
