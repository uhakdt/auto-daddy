import React from "react";
import TableRow from "./TableRow";
import FormatDate from "../../auxiliaryFunctions/dateFunctions";

const OutstandingFinances = ({ full, aiContent, goToFinanceSection }) => {
  if (full.FinanceRecordList.length === 0) {
    return (
      <section ref={goToFinanceSection} className="section">
        <div className="section-title">Outstanding Finances</div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section ref={goToFinanceSection} className="section">
      <div className="section-title">Outstanding Finances</div>
      <div className="section-divider"></div>
      <div className="section-content">
        {aiContent ? (
          <div className="ai-summary-container">
            <div className="ai-summary-content">{aiContent}</div>
            <div className="ai-summary-by">Powered By ChadGPT</div>
          </div>
        ) : null}
        {full.FinanceRecordList.map((x, i) => {
          return (
            <div className="table-figure-container">
              <table rules="all" className="section-table">
                <tbody>
                  <TableRow item={x.AgreementDate} title="Agreement Date">
                    {FormatDate(x.AgreementDate)}
                  </TableRow>
                  {x.AgreementNumber !== "REDACTED" && (
                    <TableRow item={x.AgreementNumber} title="Agreement Number">
                      {x.AgreementNumber}
                    </TableRow>
                  )}
                  <TableRow item={x.AgreementTerm} title="Agreement Term">
                    {x.AgreementTerm}
                  </TableRow>
                  <TableRow item={x.AgreementType} title="Agreement Type">
                    {x.AgreementType}
                  </TableRow>
                  {x.ContactNumber !== "REDACTED" && (
                    <TableRow item={x.ContactNumber} title="Contact Number">
                      {x.ContactNumber}
                    </TableRow>
                  )}
                  <TableRow item={x.FinanceCompany} title="Finance Company">
                    {x.FinanceCompany}
                  </TableRow>
                  <TableRow
                    item={x.VehicleDescription}
                    title="Vehicle Description"
                  >
                    {x.VehicleDescription}
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

export default OutstandingFinances;
