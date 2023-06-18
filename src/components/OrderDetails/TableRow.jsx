import React from "react";

const TableRow = ({ item, title, children }) => {
  if (!item) return null;

  const statusStyle = {
    backgroundColor: "rgb(225, 249, 9)",
    borderColor: "rgb(121, 130, 45)",
  };

  return (
    <tr>
      <td className="section-table-first-column">
        <div className="section-table-row-status" style={statusStyle}></div>
      </td>
      <td className="section-table-second-column">{title}</td>
      <td>{children}</td>
    </tr>
  );
};

export default TableRow;
