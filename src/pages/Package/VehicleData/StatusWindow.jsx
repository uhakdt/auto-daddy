import React from "react";
import "./StatusWindow.css";

const StatusWindow = ({ title, dueDate, status }) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  var condition = status === "Valid" || status === "Taxed";
  let colour; // Declare the variable once using 'let'

  if (condition) {
    colour = "#32ce57";
  } else {
    colour = "#fd4438";
  }

  return (
    <div
      className="status-window-package"
      style={{
        backgroundImage: `linear-gradient(90deg, ${colour} 0.8rem, white 0.8rem`,
        borderColor: "#E0DFDF",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <div className="status-window-title-package">
          <span>{title}</span>

          <img
            alt="Google"
            src={iconsUrl + (condition ? "check.svg" : "close.svg")}
            height={20}
          />
        </div>
        <div className="status-window-divider-package"></div>
        <div className="status-window-details-package">
          <div className="status-window-details-package-title">Due date: </div>
          <span className="status-window-details-package-text">{dueDate}</span>
        </div>
        <div className="status-window-details-package">
          <div className="status-window-details-package-title">Status:</div>
          <span className="status-window-details-package-text">{status}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusWindow;
