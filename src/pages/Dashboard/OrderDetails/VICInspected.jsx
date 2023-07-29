import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const VICInspected = ({ full, aiContent, aiContentLoading }) => {
  if (!full.VicTested) {
    return (
      <section className="section">
        <div className="section-title">VIC Inspected</div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section-title">VIC Inspected</div>
      <div className="section-divider"></div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />

        <div className="table-figure-container">
          <div rules="all" className="section-table">
            <TableRow
              item={FormatDate(full?.VicTestDate)}
              title="Date"
              colour="#6f508c"
              last={false}
            >
              {FormatDate(full?.VicTestDate)}
            </TableRow>
            <TableRow
              item={full?.VicTestResult}
              title="Test Result"
              colour="#6f508c"
              last={false}
            >
              {full?.VicTestResult}
            </TableRow>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VICInspected;
