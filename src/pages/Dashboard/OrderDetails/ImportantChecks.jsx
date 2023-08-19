import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const ImportantChecks = ({ basic, aiContent, aiContentLoading, condition }) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  return (
    <section className="section">
      <div className="section-title">
        <div>
          Important Checks <br />
          <div className="section-title-sub">
            It is important to check the following details before purchasing to
            confirm the vehicle's identity.
          </div>
        </div>
        <div>
          <img
            alt="Google"
            src={iconsUrl + (condition ? "check.svg" : "close.svg")}
            height={20}
          />
        </div>
      </div>
      <div className="section-divider"></div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />

        <div className="table-figure-container">
          <div className="section-table">
            <TableRow
              item={basic?.VehicleRegistration?.VinLast5}
              title="VIN Last 5 Digits"
              colour="#6f508c"
              last={false}
            >
              {basic?.VehicleRegistration?.VinLast5 || "Unknown"}
            </TableRow>
            <TableRow
              item={basic?.VehicleRegistration?.EngineNumber}
              title="Engine Number"
              colour="#6f508c"
              last={false}
            >
              {basic?.VehicleRegistration?.EngineNumber || "Unknown"}
            </TableRow>
            <TableRow
              item={
                basic?.VehicleHistory?.V5CCertificateList?.[0]?.CertificateDate
              }
              title="V5C Issue Date"
              colour="#6f508c"
              last={true}
            >
              {FormatDate(
                basic?.VehicleHistory?.V5CCertificateList?.[0]?.CertificateDate
              ) || "Unknown"}
            </TableRow>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantChecks;
