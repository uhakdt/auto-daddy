import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const PlateChangesSection = ({
  full,
  aiContent,
  goToPlateSection,
  aiContentLoading,
}) => {
  if (full.PlateChangeCount === 0) {
    return (
      <section ref={goToPlateSection} className="section">
        <div className="section-title">Plate Changes</div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section ref={goToPlateSection} className="section">
      <div className="section-title">Plate Changes</div>
      <div className="section-divider"></div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />

        {full.PlateChangeList.map((x, i) => {
          return (
            <div key={i} className="table-figure-container">
              <div className="section-table">
                <TableRow
                  item={x?.DateChanged}
                  title="Date Changed"
                  color="#6f508c"
                  last={false}
                >
                  {FormatDate(x?.DateChanged)}
                </TableRow>
                <TableRow
                  item={x?.PreviousVrm}
                  title="Previous Plate Number"
                  color="#6f508c"
                  last={true}
                >
                  {x?.PreviousVrm}
                </TableRow>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PlateChangesSection;
