import React from "react";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInAsGuest,
  signInWithFacebook,
} from "../firebase";

import "./AuthForm.css";

const LoginForm = ({
  setFormType,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  setOpen,
  page,
}) => {
  const handleSetOpen = () => {
    if (page === "landing") {
      setOpen(false);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  return (
    <div className="auth">
      <div className="auth-header">
        <span>Login</span>
        <img
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
          <img src={iconsUrl + "google.svg"} height={20} />{" "}
          <span>Login with Google</span>
        </button>
        <button
          onClick={() => {
            signInWithFacebook();
            handleSetOpen();
          }}
        >
          <img src={iconsUrl + "facebook.svg"} height={20} />{" "}
          <span>Login with Facebook</span>
        </button>
      </div>
      <div className="separator">Or</div>
      <div className="input-field">
        <img src={iconsUrl + "email.svg"} height={20} />
        <input
          type="text"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </div>
      <div className="input-field">
        <img
          src={iconsUrl + (isPasswordVisible ? "unlocked.svg" : "locked.svg")}
          height={20}
        />
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <img
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
            logInWithEmailAndPassword(loginEmail, loginPassword);
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
