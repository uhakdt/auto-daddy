import React from "react";
import "./TableRow.css";

const TableRow = ({ item, title, colour, last, children }) => {
  if (!item) return null;

  return (
    <table className={`table-row-container ${last ? "last-row" : ""}`}>
      <tbody>
        <tr>
          <td className="table-row-title">{title}</td>
          <td className="table-row-children">{children}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableRow;
