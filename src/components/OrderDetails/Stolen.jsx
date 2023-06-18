import React from "react";
import TableRow from "./TableRow";
import FormatDate from "../../auxiliaryFunctions/dateFunctions";

const Stolen = ({ full, aiContent, goToStolenSection }) => {
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
        {aiContent ? (
          <div className="ai-summary-container">
            <div className="ai-summary-content">{aiContent}</div>
            <div className="ai-summary-by">Powered By ChadGPT</div>
          </div>
        ) : null}
        <div className="table-figure-container">
          <table rules="all" className="section-table">
            <tbody>
              <TableRow item={full.StolenStatus} title="Status">
                {full.StolenStatus}
              </TableRow>
              <TableRow item={full.StolenContactNumber} title="Contact Number">
                {full.StolenContactNumber}
              </TableRow>
              <TableRow item={full.StolenDate} title="Date">
                {FormatDate(full.StolenDate)}
              </TableRow>
              <TableRow item={full.StolenPoliceForce} title="Police Force">
                {full.StolenPoliceForce}
              </TableRow>
              <TableRow item={full.StolenInfoSource} title="Information Source">
                {full.StolenInfoSource}
              </TableRow>
            </tbody>
          </table>
        </div>
        {full.StolenMiaftrRecordCount > 0 &&
          full.StolenMiaftrRecordList.map((x, i) => {
            // TODO: Implement logic here for StolenMiaftrRecordList
          })}
      </div>
    </section>
  );
};

export default Stolen;
