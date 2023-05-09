import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import "./RegisterPage.css";
import { AppContext } from "../../appContext";

function RegisterPage() {
  const [appData] = useContext(AppContext);
  const { tier, vehicleFreeData } = appData;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  console.log(tier, vehicleFreeData);

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

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
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account?{" "}
          <button
            onClick={() => {
              navigate("/login", { state: { tier, vehicleFreeData } });
            }}
          >
            Login
          </button>{" "}
          now.
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
