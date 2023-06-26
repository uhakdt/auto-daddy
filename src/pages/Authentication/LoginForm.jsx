import React, { useState } from "react";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <input
        type="text"
        className="auth__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className="auth__textBox"
        style={{}}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <a className="auth__forgotPassword" href="/auth/reset">
        Forgot Password?
      </a>
      <button
        className="auth__btn"
        onClick={() => logInWithEmailAndPassword(email, password)}
      >
        Login
      </button>
      <div className="auth__line">Or Sign in with</div>
      <button className="auth__google" onClick={signInWithGoogle}>
        <img
          alt="Google Logo"
          className="auth__google__logo"
          src={`${process.env.PUBLIC_URL}/logos/google-logo.png`}
        ></img>
      </button>
      <a className="auth__link__simple" href="/auth/register">
        <span className="auth__text__grey">Not registered yet?</span>
        <span className="auth__text__bold"> Create Account</span>
      </a>
    </>
  );
}

export default LoginForm;
