import React from "react";
import { FaCheck } from "react-icons/fa";
import "./FullReportList.css";

const FullReportList = () => (
  <div className="full-report-container">
    {[
      "TAX",
      "MOT",
      "Mileage",
      "Finance",
      "Stolen",
      "Write-Off",
      "Full Scrap",
      "Import/ Export",
      "Plate& Colour",
      "Owner& Keeper",
      "VIN",
      "Ex-Taxi",
    ].map((item, index) => (
      <div
        className="full-report-item"
        style={{
          backgroundImage: `linear-gradient(90deg, black 0.8rem, white 0.8rem)`,
          borderColor: "#E0DFDF",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        }}
        key={index}
      >
        <div className="full-report-item-title">
          <span>{item}</span>
        </div>
        <FaCheck className="full-report-check-icon" color="#32CE57" size={20} />
        <div className="full-report-item-divider"></div>
      </div>
    ))}
  </div>
);
export default FullReportList;