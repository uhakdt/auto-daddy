import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./LandingPage";
import AboutPage from "./AboutPage";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </nav>
  );
}

export default Navigation;
