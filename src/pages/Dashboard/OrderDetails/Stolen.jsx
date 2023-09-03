import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const Stolen = ({
  full,
  aiContent,
  goToStolenSection,
  aiContentLoading,
  condition,
}) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  if (!full.Stolen) {
    return (
      <section ref={goToStolenSection} className="section">
        <div className="section-title">
          <div>Stolen</div>
          <div>
            <img
              alt="Google"
              src={iconsUrl + (condition ? "check.svg" : "close.svg")}
              height={40}
            />
          </div>
        </div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section ref={goToStolenSection} className="section">
      <div className="section-title">
        <div>Stolen</div>
        <div>
          <img
            alt="Google"
            src={iconsUrl + (condition ? "check.svg" : "close.svg")}
            height={40}
          />
        </div>
      </div>
      <div className="section-divider"></div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />
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
