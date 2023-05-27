import React from "react";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";
import "./ResetPage.css";
import { AppContext } from "../../appContext";

function ResetPage() {
  const { vehicleFreeData } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user && !vehicleFreeData) {
      navigate("/account");
    } else if (user && vehicleFreeData != null) {
      navigate("/tiers", { state: { vehicleFreeData } });
    }
  }, [user, loading, navigate, vehicleFreeData]);

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button className="reset__btn" onClick={() => sendPasswordReset(email)}>
          Send password reset email
        </button>
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

export default ResetPage;
