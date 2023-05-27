import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./LoginPage.css";
import { AppContext } from "../../appContext";

function LoginPage() {
  const {
    vehicleFreeData,
    clickedLoginOrRegisterButton,
    setClickedLoginOrRegisterButton,
  } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (
      user &&
      (vehicleFreeData != null || clickedLoginOrRegisterButton === true)
    ) {
      navigate("/account");
    } else if (user && vehicleFreeData === null) {
      navigate("/");
    } else if (!user && clickedLoginOrRegisterButton === false) {
    }
  }, [user, loading, navigate, vehicleFreeData]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <button
            onClick={() => {
              navigate("/reset", { state: { vehicleFreeData } });
            }}
          >
            Forgot Password
          </button>
        </div>
        <div>
          Don't have an account?{" "}
          <button
            onClick={() => {
              navigate("/register", { state: { vehicleFreeData } });
            }}
          >
            Register
          </button>{" "}
          now.
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
