import React, { useState } from "react";
import { registerWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useNavigate } from "react-router-dom";

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
      <button className="auth__btn" onClick={register}>
        Register
      </button>
      <button className="auth__btn auth__google" onClick={signInWithGoogle}>
        Register with Google
      </button>
      <button onClick={() => navigate("/auth/reset")}>Forgot Password</button>
    </>
  );
}

export default RegisterForm;