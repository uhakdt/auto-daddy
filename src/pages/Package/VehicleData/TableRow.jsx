import React from "react";
import "./TableRow.css";

const TableRow = ({ item, title, colour, last, children }) => {
  if (!item) return null;

  return (
    <div className="table-row-container">
      <div className="table-row-value-container">
        <div className="table-row-status"></div>
        <div className="table-row-title-value-container">
          <span className="table-row-title">{title}</span>
          <span className="table-row-value">{children}</span>
        </div>
      </div>
      {last ? null : <div className="table-row-divider"></div>}
    </div>
  );
};

export default TableRow;
