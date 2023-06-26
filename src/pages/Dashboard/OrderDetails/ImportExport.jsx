import React from "react";
import TableRow from "./TableRow";
import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const ImportExport = ({ full, aiContent, goToImportExportSection }) => {
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
        {aiContent ? (
          <div className="ai-summary-container">
            <div className="ai-summary-content">{aiContent}</div>
            <div className="ai-summary-by">Powered By ChadGPT</div>
          </div>
        ) : null}
        <div className="table-figure-container">
          <table rules="all" className="section-table">
            <tbody>
              <TableRow
                item={full.DateFirstRegistered}
                title="Date First Registered"
              >
                {FormatDate(full.DateFirstRegistered)}
              </TableRow>
              {full.Imported ? (
                <TableRow item={full.ImportDate} title="Import Date">
                  {FormatDate(full.ImportDate)}
                </TableRow>
              ) : (
                <TableRow item={false} title="Imported">
                  False
                </TableRow>
              )}
              {full.ImportUsedBeforeUkRegistration && (
                <TableRow
                  item={full.ImportUsedBeforeUkRegistration}
                  title="Import Used before UK Registration"
                >
                  {full.ImportUsedBeforeUkRegistration}
                </TableRow>
              )}
              {full.ImportedFromOutsideEu && (
                <TableRow
                  item={full.ImportedFromOutsideEu}
                  title="Imported From Outside EU"
                >
                  {full.ImportedFromOutsideEu}
                </TableRow>
              )}
              {full.Exported ? (
                <TableRow item={full.ExportDate} title="Export Date">
                  {FormatDate(full.ExportDate)}
                </TableRow>
              ) : (
                <TableRow item={false} title="Exported">
                  False
                </TableRow>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ImportExport;
