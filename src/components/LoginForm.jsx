import React, { useState } from "react";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInAsGuest,
  signInWithFacebook,
} from "../firebase";

import "./AuthForm.css";

const LoginForm = ({ setFormType, setOpen, page }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSetOpen = () => {
    if (page === "landing") {
      setOpen(false);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  return (
    <div className="auth">
      <div className="auth-header">
        <span>Login</span>
        <img
          alt="close"
          src={iconsUrl + "close.svg"}
          onClick={() => setOpen(false)}
          height={20}
        />
      </div>
      <div className="submit-btn">
        <button
          onClick={() => {
            signInAsGuest();
            handleSetOpen();
          }}
        >
          Continue as Guest
        </button>
      </div>
      <div className="social-auth-buttons">
        <button
          onClick={() => {
            signInWithGoogle();
            handleSetOpen();
          }}
        >
          <img alt="Google" src={iconsUrl + "google.svg"} height={20} />{" "}
          <span>Login with Google</span>
        </button>
        <button
          onClick={() => {
            signInWithFacebook();
            handleSetOpen();
          }}
        >
          <img alt="Facebook" src={iconsUrl + "facebook.svg"} height={20} />{" "}
          <span>Login with Facebook</span>
        </button>
      </div>
      <div className="separator">Or</div>
      <div className="input-field">
        <img alt="Email" src={iconsUrl + "email.svg"} height={20} />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-field">
        <img
          alt="Password"
          src={iconsUrl + (isPasswordVisible ? "unlocked.svg" : "locked.svg")}
          height={20}
        />
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          alt="Toggle Password Visibility"
          src={iconsUrl + (isPasswordVisible ? "nonhidden.svg" : "hidden.svg")}
          height={20}
          onClick={togglePasswordVisibility}
          style={{
            cursor: "pointer",
            opacity: isPasswordVisible ? "1" : "0.3",
          }}
        />
      </div>
      <div className="forgot-password">
        <a href="/auth/reset">Forgot Password?</a>
      </div>
      <div className="submit-btn">
        <button
          onClick={() => {
            logInWithEmailAndPassword(email, password);
            handleSetOpen();
          }}
        >
          Login
        </button>
      </div>
      <div className="auth-toggle">
        Not a member?{" "}
        <span onClick={() => setFormType("register")}>Sign up</span>
      </div>
    </div>
  );
};

export default LoginForm;
