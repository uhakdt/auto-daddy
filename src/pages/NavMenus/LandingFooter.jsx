import React from "react";
import { Link } from "react-router-dom";
import "./LandingFooter.css";

function LandingFooter() {
  return (
    <div className="landing-footer-container">
      <div className="landing-logos-container">
        <img
          className="landing-logo"
          src={`${process.env.PUBLIC_URL}/logos/openai-logo.png`}
          alt="Logo"
        />
        <img
          className="landing-logo"
          src={`${process.env.PUBLIC_URL}/logos/ukvd-logo.svg`}
          alt="Logo"
        />
        <img
          className="landing-logo"
          src={`${process.env.PUBLIC_URL}/logos/replit-logo.svg`}
          alt="Logo"
        />
        <img
          className="landing-logo"
          src={`${process.env.PUBLIC_URL}/logos/dvla-logo.png`}
          alt="Logo"
        />
        <img
          className="landing-logo"
          src={`${process.env.PUBLIC_URL}/logos/applepay-logo.svg`}
          alt="Logo"
        />
        <img
          className="landing-logo"
          src={`${process.env.PUBLIC_URL}/logos/stripe-logo.svg`}
          alt="Logo"
        />
        <img
          className="landing-logo"
          src={`${process.env.PUBLIC_URL}/logos/paypal-logo.svg`}
          alt="Logo"
        />
      </div>
      <div className="landing-footer">
        <Link to="/privacy">Privacy</Link> |
        <Link to="/terms">Terms and Conditions</Link> |
        {/* <Link to="/cookies">Cookies</Link> |
        <Link to="/gdpr">GDPR</Link> | */}
        <a href="mailto:support@autodaddy.co.uk">Contact Us</a>
      </div>
      <div className="landing-copyright">© 2023 AutoDaddy</div>
    </div>
  );
}

export default LandingFooter;
