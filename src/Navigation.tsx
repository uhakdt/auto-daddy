import { Link, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPage from "./pages/ResetPage";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";
import TiersPage from "./pages/TiersPage";
import PaymentPage from "./pages/PaymentPage";
import { useHandleLogout } from "./auxiliaryHooks/authHooks";

function Navigation() {
  const [user, loading] = useAuthState(auth);
  const handleLogout = useHandleLogout();

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
