import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "./firebase";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ResetPage from "./ResetPage";
import DashboardPage from "./DashboardPage";
import AccountPage from "./AccountPage";
import TiersPage from "./TiersPage";
import PaymentPage from "./PaymentPage";
import { useContext } from "react";
import { AppContext, initialData } from "./appContext";

function Navigation() {
  const [user, loading] = useAuthState(auth);
  const [, setAppData] = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      sessionStorage.removeItem("appData");
      setAppData(initialData);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <nav>
        <ul>
          {!user && !loading && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {user && !loading && (
            <>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tiers" element={<TiersPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}

export default Navigation;
