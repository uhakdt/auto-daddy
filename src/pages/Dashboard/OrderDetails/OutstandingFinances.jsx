import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const OutstandingFinances = ({
  full,
  aiContent,
  goToFinanceSection,
  aiContentLoading,
  condition,
}) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";
  if (full.FinanceRecordList.length === 0) {
    return (
      <section ref={goToFinanceSection} className="section">
        <div className="section-title">
          <div>Outstanding Finances</div>
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
    <section ref={goToFinanceSection} className="section">
      <div className="section-title">
        <div>Outstanding Finances</div>
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

        {full?.FinanceRecordList?.map((x, i) => {
          return (
            <div key={i} className="table-figure-container">
              <div className="section-table">
                <TableRow
                  item={x?.AgreementDate}
                  title="Agreement Date"
                  colour="#6f508c"
                  last={false}
                >
                  {FormatDate(x?.AgreementDate)}
                </TableRow>
                {x?.AgreementNumber !== "REDACTED" && (
                  <TableRow
                    item={x?.AgreementNumber}
                    title="Agreement Number"
                    colour="#6f508c"
                    last={false}
                  >
                    {x?.AgreementNumber}
                  </TableRow>
                )}
                <TableRow
                  item={x?.AgreementTerm}
                  title="Agreement Term"
                  colour="#6f508c"
                  last={false}
                >
                  {x?.AgreementTerm}
                </TableRow>
                <TableRow
                  item={x?.AgreementType}
                  title="Agreement Type"
                  colour="#6f508c"
                  last={false}
                >
                  {x?.AgreementType}
                </TableRow>
                {x?.ContactNumber !== "REDACTED" && (
                  <TableRow
                    item={x?.ContactNumber}
                    title="Contact Number"
                    colour="#6f508c"
                    last={false}
                  >
                    {x?.ContactNumber}
                  </TableRow>
                )}
                <TableRow
                  item={x?.FinanceCompany}
                  title="Finance Company"
                  colour="#6f508c"
                  last={false}
                >
                  {x?.FinanceCompany}
                </TableRow>
                <TableRow
                  item={x?.VehicleDescription}
                  title="Vehicle Description"
                  colour="#6f508c"
                  last={true}
                >
                  {x?.VehicleDescription}
                </TableRow>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OutstandingFinances;
