import React from "react";
import "./StatusWindow.css";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";

const StatusWindow = ({ title, dueDate, status, colour }) => (
  <div
    className="status-window"
    style={{
      backgroundImage: `linear-gradient(90deg, ${colour} 0.8rem, white 0.8rem`,
    }}
  >
    <div>
      <div className="status-window-title">
        <span style={{ color: `${colour}` }}>{title}</span>

        {status === "Valid" || status === "Taxed" ? (
          <FaCheck color={`${colour}`} />
        ) : (
          <FaRegTimesCircle color={`${colour}`} />
        )}
      </div>
      <div className="status-window-divider"></div>
      <div className="status-window-details" style={{ color: `${colour}` }}>
        <div style={{ paddingBottom: 5 }}>
          Due date:{" "}
          <span className="status-window-details-value">{dueDate}</span>
        </div>
        <div>
          Status: <span className="status-window-details-value">{status}</span>
        </div>
      </div>
    </div>
  </div>
);

export default StatusWindow;
