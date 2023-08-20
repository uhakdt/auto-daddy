import React, { useState } from "react";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
} from "../firebase";

import "./AuthForm.css";

const RegisterForm = ({ setFormType, setOpen, page }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSetOpen = () => {
    if (page === "landing") {
      setOpen(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  return (
    <div className="auth">
      <div className="auth-header">
        <div>Register</div>
        <img
          alt="close"
          src={iconsUrl + "close.svg"}
          onClick={() => setOpen(false)}
          height={20}
        />
      </div>
      <div className="social-auth-buttons">
        <button
          onClick={() => {
            signInWithGoogle();
            handleSetOpen();
          }}
        >
          <img alt="Google" src={iconsUrl + "google.svg"} height={20} />
          <span>Register with Google</span>
        </button>
        {/*        <button
          onClick={() => {
            signInWithFacebook();
            handleSetOpen();
          }}
        >
          <img alt="Facebook" src={iconsUrl + "facebook.svg"} height={20} />{" "}
          <span>Login with Facebook</span>
        </button> */}
      </div>
      <div className="separator">
        <span>or</span>
      </div>
      <div className="input-field">
        {/* <img alt="Email" src={iconsUrl + "email.svg"} height={20} /> */}
        <input
          type="text"
          placeholder="E-mail Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-field">
        {/*  <img
          alt="Password"
          src={iconsUrl + (isPasswordVisible ? "unlocked.svg" : "locked.svg")}
          height={20}
        /> */}
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          alt="Toggle Password Visibility"
          src={iconsUrl + (isPasswordVisible ? "nonhidden.svg" : "hidden.svg")}
          height={15}
          onClick={togglePasswordVisibility}
          style={{
            cursor: "pointer",
            opacity: isPasswordVisible ? "1" : "0.3",
          }}
        />
      </div>
      <div className="submit-btn">
        <button
          onClick={() => {
            registerWithEmailAndPassword(email, password);
            handleSetOpen();
          }}
        >
          Register
        </button>
      </div>
      <div className="auth-toggle">
        Already a member?{" "}
        <span onClick={() => setFormType("login")}>Login</span>
      </div>
    </div>
  );
};

export default RegisterForm;
