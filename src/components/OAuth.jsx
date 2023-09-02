import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { FcGoogle } from "react-icons/fc";
import "../stylesheets/oAuth.scss";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOAuthSigning = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);
      const user = userCredentials.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="oauth-container">
      <p onClick={handleOAuthSigning}>
        Sign {location.pathname === "/sign-up" ? "up" : "in"}
      </p>
      <FcGoogle onClick={handleOAuthSigning} size="35" className="g-icon" />
    </div>
  );
}

export default OAuth;
