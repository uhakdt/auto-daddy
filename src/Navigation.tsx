import { Link, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import AboutPage from "./AboutPage";

function Navigation() {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
				</ul>
			</nav>

			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/about" element={<AboutPage />} />
			</Routes>
		</div>
	);
}

export default Navigation;
