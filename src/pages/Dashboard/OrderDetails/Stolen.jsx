import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const Stolen = ({ full, aiContent, goToStolenSection, aiContentLoading }) => {
  if (!full.Stolen) {
    return (
      <section ref={goToStolenSection} className="section">
        <div className="section-title">Stolen</div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section ref={goToStolenSection} className="section">
      <div className="section-title">Stolen</div>
      <div className="section-divider"></div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />

        <div className="table-figure-container">
          <div className="section-table">
            <TableRow
              item={full?.StolenStatus}
              title="Status"
              colour="#6f508c"
              last={false}
            >
              {full?.StolenStatus}
            </TableRow>
            <TableRow
              item={full?.StolenContactNumber}
              title="Contact Number"
              colour="#6f508c"
              last={false}
            >
              {full?.StolenContactNumber}
            </TableRow>
            <TableRow
              item={full?.StolenDate}
              title="Date"
              colour="#6f508c"
              last={false}
            >
              {FormatDate(full?.StolenDate)}
            </TableRow>
            <TableRow
              item={full?.StolenPoliceForce}
              title="Police Force"
              colour="#6f508c"
              last={false}
            >
              {full?.StolenPoliceForce}
            </TableRow>
            <TableRow
              item={full?.StolenInfoSource}
              title="Information Source"
              colour="#6f508c"
              last={true}
            >
              {full?.StolenInfoSource}
            </TableRow>
          </div>
        </div>
        {full.StolenMiaftrRecordCount > 0 &&
          full.StolenMiaftrRecordList.map((x, i) => {
            // TODO: Implement logic here for StolenMiaftrRecordList
            return <></>;
          })}
      </div>
    </section>
  );
};

export default Stolen;
