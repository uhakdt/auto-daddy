import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./LoginPage.css";
import { AppContext } from "../appContext";

function LoginPage() {
  const [appData] = useContext(AppContext);
  const { tier, vehicleFreeData } = appData;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  console.log(tier, vehicleFreeData);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user && (!tier || !vehicleFreeData)) {
      navigate("/account");
    } else if (user && tier != null && vehicleFreeData != null) {
      navigate("/payment", { state: { tier, vehicleFreeData } });
    }
  }, [user, loading, navigate, tier, vehicleFreeData]);

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
              navigate("/reset", { state: { tier, vehicleFreeData } });
            }}
          >
            Forgot Password
          </button>
        </div>
        <div>
          Don't have an account?{" "}
          <button
            onClick={() => {
              navigate("/register", { state: { tier, vehicleFreeData } });
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
