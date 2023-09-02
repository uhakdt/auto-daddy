import React from "react";
import "../OrderDetails.css";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";

const StatusWindow = ({
  title,
  details,
  onClick,
  gradientColor,
  noHover,
  condition,
}) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  const computedGradientColor = gradientColor;
  const computedNoHover = noHover;

  const green = "#32ce57";
  const red = "#fd4438";

  return (
    <div
      onClick={onClick}
      className={`status-window ${computedNoHover ? "no-hover" : ""}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${computedGradientColor} 0.8rem, white 0.8rem`,
        cursor: `${computedNoHover ? "default" : "pointer"}`,
        borderColor: "#E0DFDF",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="status-window-content-container">
        <div className="status-window-title">
          <span>{title}</span>
          <img
            alt="Google"
            src={iconsUrl + (condition ? "check.svg" : "close.svg")}
            height={20} style={{ marginRight: "5px" }}
          />
        </div>
        <div className="status-window-divider"></div>
        <div className="status-window-details">
          <span className="status-window-details-value">{details}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusWindow;
