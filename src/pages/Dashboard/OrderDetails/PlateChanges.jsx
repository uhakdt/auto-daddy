import React from "react";
import TableRow from "./TableRow";
import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const PlateChangesSection = ({ full, aiContent, goToPlateSection }) => {
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
        {aiContent && (
          <div className="ai-summary-container">
            <div className="ai-summary-content">{aiContent}</div>
            <div className="ai-summary-by">Powered By ChadGPT</div>
          </div>
        )}
        {full.PlateChangeList.map((x, i) => {
          return (
            <div key={i} className="table-figure-container">
              <table rules="all" className="section-table">
                <tbody>
                  <TableRow item={x.DateChanged} title="Date Changed">
                    {FormatDate(x.DateChanged)}
                  </TableRow>
                  <TableRow item={x.PreviousVrm} title="Previous Plate Number">
                    {x.PreviousVrm}
                  </TableRow>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PlateChangesSection;
