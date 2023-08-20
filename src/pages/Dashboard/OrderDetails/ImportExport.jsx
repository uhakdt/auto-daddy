import React from "react";
import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const ImportExport = ({
  full,
  goToImportExportSection,
  aiContent,
  aiContentLoading,
  condition,
}) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  if (!full.Imported && !full.Exported) {
    return (
      <section ref={goToImportExportSection} className="section">
        <div className="section-title">
          <div>Import / Export</div>
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
    <section ref={goToImportExportSection} className="section">
      <div className="section-title">
        <div>Import / Export</div>
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

        <div className="table-figure-container">
          <div className="section-table">
            <TableRow
              item={full?.DateFirstRegistered}
              title="Date First Registered"
              colour="#6f508c"
              last={false}
            >
              {FormatDate(full?.DateFirstRegistered || "Unknown")}
            </TableRow>

            {full?.Imported ? (
              <TableRow
                item={full?.ImportDate}
                title="Import Date"
                colour="#6f508c"
                last={false}
              >
                {FormatDate(full?.ImportDate || "Unknown")}
              </TableRow>
            ) : (
              <TableRow
                item={false}
                title="Imported"
                colour="#6f508c"
                last={false}
              >
                False
              </TableRow>
            )}

            {full?.ImportUsedBeforeUkRegistration && (
              <TableRow
                item={full?.ImportUsedBeforeUkRegistration}
                title="Import Used before UK Registration"
                colour="#6f508c"
                last={false}
              >
                {full?.ImportUsedBeforeUkRegistration || "Unknown"}
              </TableRow>
            )}

            {full?.ImportedFromOutsideEu && (
              <TableRow
                item={full?.ImportedFromOutsideEu}
                title="Imported From Outside EU"
                colour="#6f508c"
                last={false}
              >
                {full?.ImportedFromOutsideEu || "Unknown"}
              </TableRow>
            )}

            {full?.Exported ? (
              <TableRow
                item={full?.ExportDate}
                title="Export Date"
                colour="#6f508c"
                last={true}
              >
                {FormatDate(full?.ExportDate || "Unknown")}
              </TableRow>
            ) : (
              <TableRow
                item={false}
                title="Exported"
                colour="#6f508c"
                last={true}
              >
                False
              </TableRow>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportExport;
