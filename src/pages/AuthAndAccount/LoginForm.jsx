import React, { useState } from "react";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Link className="auth__forgotPassword" href="/auth/reset">
        Forgot Password
      </Link>
      <button
        className="auth__btn"
        onClick={() => logInWithEmailAndPassword(email, password)}
      >
        Login
      </button>
      <button className="auth__btn auth__google" onClick={signInWithGoogle}>
        Login with Google
      </button>
      <button onClick={() => navigate("/auth/reset")}>Forgot Password</button>
      <button onClick={() => navigate("/auth/register")}>Register</button>
    </>
  );
}

export default LoginForm;
