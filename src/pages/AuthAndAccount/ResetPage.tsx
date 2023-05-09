import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";
import "./ResetPage.css";
import { AppContext } from "../../appContext";

function ResetPage() {
  const [appData] = useContext(AppContext);
  const { tier, vehicleFreeData } = appData;
  const [email, setEmail] = useState("");
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

export default ResetPage;
