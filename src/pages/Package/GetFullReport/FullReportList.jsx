import React from "react";
import { FaCheck } from "react-icons/fa";
import "./FullReportList.css";

const FullReportList = () => (
  <div>
    {[
      "MOT history",
      "TAX history",
      "Mileage history",
      "Finance history",
      "Stolen history",
      "Write-Off history",
      "Full Scrap history",
      "Import / Export",
      "Plate and Colour",
      "Owner and Keeper",
    ].map((item) => (
      <div className="full-report-list-item" key={item}>
        <FaCheck className="check-icon" color="grey" size={10} />
        <span>{item}</span>
      </div>
    ))}
  </div>
);

export default FullReportList;
