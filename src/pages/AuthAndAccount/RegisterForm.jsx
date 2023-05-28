import React, { useState } from "react";
import { registerWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <>
      <input
        type="text"
        className="auth__textBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div className="auth__line">Or Register with</div>

      <button className="auth__google" onClick={signInWithGoogle}>
        <img
          className="auth__google__logo"
          src={`${process.env.PUBLIC_URL}/google-logo.png`}
        ></img>
      </button>
      <a className="auth__link__simple" href="/auth/login">
        <span className="auth__text__grey">Have an account?</span>
        <span className="auth__text__bold"> Sign In</span>
      </a>
    </>
  );
}

export default RegisterForm;
