import React from "react";
import "./LoginForm.css";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";

const LoginForm = ({
  setFormType,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
}) => {
  return (
    <div className="modal-content-auth">
      <input
        type="text"
        className="modal-content-auth-input"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className="modal-content-auth-input"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        placeholder="Password"
      />
      <a className="modal-content-auth-forgotPassword" href="/auth/reset">
        Forgot Password?
      </a>
      <button
        className="modal-content-auth-btn"
        onClick={() => logInWithEmailAndPassword(loginEmail, loginPassword)}
      >
        Login
      </button>
      <button className="modal-content-auth-google" onClick={signInWithGoogle}>
        <img
          alt="Google Logo"
          className="modal-content-auth-google-logo"
          src={`${process.env.PUBLIC_URL}/google-logo.png`}
        ></img>
      </button>
      <button
        className="modal-content-auth-link-simple"
        onClick={() => setFormType("register")}
      >
        <span className="modal-content-auth-text-grey">
          Not registered yet?
        </span>
        <span className="modal-content-auth-text-bold"> Create Account</span>
      </button>
    </div>
  );
};

export default LoginForm;
