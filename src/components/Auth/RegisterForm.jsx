import React from "react";
import "./RegisterForm.css";
import { registerWithEmailAndPassword, signInWithGoogle } from "../../firebase";

const RegisterForm = ({
  setFormType,
  registerName,
  setRegisterName,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
}) => {
  const handleRegister = () => {
    if (!registerName) {
      alert("Please enter name");
      return;
    }
    registerWithEmailAndPassword(registerName, registerEmail, registerPassword);
  };

  return (
    <div className="modal-content-auth">
      <input
        type="text"
        className="modal-content-auth-input"
        value={registerName}
        onChange={(e) => setRegisterName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        type="text"
        className="modal-content-auth-input"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className="modal-content-auth-input"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="modal-content-auth-btn" onClick={handleRegister}>
        Register
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
        onClick={() => setFormType("login")}
      >
        <span className="modal-content-auth-text-grey">
          Already have an account?
        </span>
        <span className="modal-content-auth-text-bold"> Login</span>
      </button>
    </div>
  );
};

export default RegisterForm;
