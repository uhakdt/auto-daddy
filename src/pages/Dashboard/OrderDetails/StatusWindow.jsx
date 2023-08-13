import React from "react";
import "../OrderDetails.css";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";

const StatusWindow = ({ title, details, onClick, gradientColor, noHover }) => {
  const computedGradientColor = gradientColor || "#6f508c";
  const computedNoHover = noHover || false;

  return (
    <div
      onClick={onClick}
      className={`status-window ${computedNoHover ? "no-hover" : ""}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${computedGradientColor} 0.8rem, white 0.8rem`,
        cursor: `${computedNoHover ? "default" : "pointer"}`,
      }}
    >
      <div className="status-window-content-container">
        <div className="status-window-title">
          <span style={{ color: "#42224d" }}>{title}</span>
          {gradientColor === "#6f508c" ? (
            <FaCheck color={"#42224d"} />
          ) : (
            <FaRegTimesCircle color={"#d55a6f"} />
          )}
        </div>
        <div className="status-window-divider"></div>
        <div className="status-window-details" style={{ color: "#42224d" }}>
          <span className="status-window-details-value">{details}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusWindow;
