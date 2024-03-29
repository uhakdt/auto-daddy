import React, { useState } from "react";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInAsGuest,
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
        <div>Login</div>
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
      </div>
      <div className="separator">or</div>
      <div className="input-field">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-field">
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
