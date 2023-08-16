import React from "react";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
} from "../firebase";

import "./AuthForm.css";

const RegisterForm = ({
  setFormType,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  setOpen,
  page,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

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
        <span>Register</span>
        <img
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
          <img src={iconsUrl + "google.svg"} height={20} />
          <span>Register with Google</span>
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
      <div className="separator">
        <span>Or</span>
      </div>
      <div className="input-field">
        <img src={iconsUrl + "email.svg"} height={20} />
        <input
          type="text"
          placeholder="E-mail Address"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
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
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
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
      <div className="submit-btn">
        <button
          onClick={() => {
            registerWithEmailAndPassword(registerEmail, registerPassword);
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
