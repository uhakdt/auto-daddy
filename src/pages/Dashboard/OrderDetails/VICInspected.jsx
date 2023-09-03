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
    </section>
  );
};

export default VICInspected;
