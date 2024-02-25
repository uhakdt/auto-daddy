import React from "react";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Welcome to AutoDaddy</h1>
      <p className="welcome-text">
        Access your AutoDaddy orders and view car history reports in your
        personalized dashboard. Chat with ChatGPT to ask any questions you have
        about your car history report.
      </p>
    </div>
  );
}
