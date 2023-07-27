import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const ImportantChecks = ({ basic, aiContent, aiContentLoading }) => {
  return (
    <section className="section">
      <div className="section-title">
        Important Checks <br />
        <div className="section-title-sub">
          It is important to check the following details before purchasing to
          confirm the vehicle's identity.
        </div>
      </div>
      <div className="section-divider"></div>
      <div className="section-content">
        {aiContentLoading ? (
          <div>Loading...</div> // replace this with your loading spinner
        ) : (
          aiContent && (
            <div className="ai-summary-container">
              <div className="ai-summary-content">{aiContent}</div>
              <div className="ai-summary-by">Powered By ChatGPT</div>
            </div>
          )
        )}
        <div className="table-figure-container">
          <div className="section-table">
            <TableRow
              item={basic.VehicleRegistration.VinLast5}
              title="VIN Last 5 Digits"
              colour="#6f508c"
              last={false}
            >
              {basic.VehicleRegistration.VinLast5}
            </TableRow>
            <TableRow
              item={basic.VehicleRegistration.EngineNumber}
              title="Engine Number"
              colour="#6f508c"
              last={false}
            >
              {basic.VehicleRegistration.EngineNumber}
            </TableRow>
            <TableRow
              item={basic.VehicleHistory.V5CCertificateList[0].CertificateDate}
              title="V5C Issue Date"
              colour="#6f508c"
              last={true}
            >
              {FormatDate(
                basic.VehicleHistory.V5CCertificateList[0].CertificateDate
              )}
            </TableRow>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantChecks;
