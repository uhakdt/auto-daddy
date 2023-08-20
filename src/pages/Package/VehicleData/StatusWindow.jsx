import React from "react";
import "./StatusWindow.css";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";

const StatusWindow = ({ title, dueDate, status }) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  var condition = status === "Valid" || status === "Taxed";

  if (condition) {
    var colour = "#32ce57";
  } else {
    var colour = "#fd4438";
  }

  return (
    <div
      className="status-window"
      style={{
        backgroundImage: `linear-gradient(90deg, ${colour} 0.8rem, white 0.8rem`,
        borderColor: "#E0DFDF",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div>
        <div className="status-window-title">
          <span>{title}</span>

          <img
            alt="Google"
            src={iconsUrl + (condition ? "check.svg" : "close.svg")}
            height={20}
          />
        </div>
        <div className="status-window-divider"></div>
        <div className="status-window-details">
          <div style={{ paddingBottom: 5 }}>
            Due date:{" "}
            <span className="status-window-details-value">{dueDate}</span>
          </div>
          <div>
            Status:{" "}
            <span className="status-window-details-value">{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusWindow;
