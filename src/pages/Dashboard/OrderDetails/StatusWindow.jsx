import React from "react";
import "../OrderDetails.css";

const StatusWindow = ({ title, details, onClick, gradientColor, noHover }) => (
  <div
    onClick={onClick}
    className={`status-window ${noHover ? "no-hover" : ""}`}
    style={{
      backgroundImage: `linear-gradient(90deg, ${gradientColor} 1rem, white 1rem`,
      cursor: `${noHover ? "default" : "pointer"}`,
    }}
  >
    <div className="status-window-content">
      <div className="status-window-title">{title}</div>
      <div className="status-window-details">{details}</div>
    </div>
  </div>
);

export default StatusWindow;
