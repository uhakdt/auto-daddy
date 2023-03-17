import { Link, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ResetPage from "./ResetPage";
import DashboardPage from "./DashboardPage";
import AccountPage from "./AccountPage";
import TiersPage from "./TiersPage";
import PaymentPage from "./PaymentPage";

function Navigation() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
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
