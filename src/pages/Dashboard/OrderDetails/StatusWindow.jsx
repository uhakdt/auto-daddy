import React from "react";
import "../OrderDetails.css";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";

const StatusWindow = ({ title, details, onClick, gradientColor, noHover }) => (
  <div
    onClick={onClick}
    className={`status-window ${noHover ? "no-hover" : ""}`}
    style={{
      backgroundImage: `linear-gradient(90deg, ${gradientColor} 0.8rem, white 0.8rem`,
      cursor: `${noHover ? "default" : "pointer"}`,
    }}
  >
    <div className="status-window-content-container">
      <div className="status-window-title">
        <span style={{ color: "#42224d" }}>{title}</span>
        {gradientColor === "#42224d" ? (
          <FaCheck color={"#42224d"} />
        ) : (
          <FaRegTimesCircle color={"#42224d"} />
        )}
      </div>
      <div className="status-window-divider"></div>
      <div className="status-window-details" style={{ color: "#42224d" }}>
        <span className="status-window-details-value">{details}</span>
      </div>
    </div>
  </div>
);

export default StatusWindow;
