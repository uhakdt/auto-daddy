import React from "react";
import TableRow from "../../Package/VehicleData/TableRow";
import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const ImportExport = ({
  full,
  goToImportExportSection,
  aiContent,
  aiContentLoading,
}) => {
  if (!full.Imported && !full.Exported) {
    return (
      <section ref={goToImportExportSection} className="section">
        <div className="section-title">Import / Export</div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section ref={goToImportExportSection} className="section">
      <div className="section-title">Import / Export</div>
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
              item={full.DateFirstRegistered}
              title="Date First Registered"
              colour="#6f508c"
              last={false}
            >
              {FormatDate(full.DateFirstRegistered)}
            </TableRow>

            {full.Imported ? (
              <TableRow
                item={full.ImportDate}
                title="Import Date"
                colour="#6f508c"
                last={false}
              >
                {FormatDate(full.ImportDate)}
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

            {full.ImportUsedBeforeUkRegistration && (
              <TableRow
                item={full.ImportUsedBeforeUkRegistration}
                title="Import Used before UK Registration"
                colour="#6f508c"
                last={false}
              >
                {full.ImportUsedBeforeUkRegistration}
              </TableRow>
            )}

            {full.ImportedFromOutsideEu && (
              <TableRow
                item={full.ImportedFromOutsideEu}
                title="Imported From Outside EU"
                colour="#6f508c"
                last={false}
              >
                {full.ImportedFromOutsideEu}
              </TableRow>
            )}

            {full.Exported ? (
              <TableRow
                item={full.ExportDate}
                title="Export Date"
                colour="#6f508c"
                last={true}
              >
                {FormatDate(full.ExportDate)}
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
