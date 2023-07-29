import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const WriteOff = ({
  full,
  aiContent,
  goToWriteOffSection,
  aiContentLoading,
}) => {
  if (!full.WrittenOff && full.WriteOffRecordCount === 0) {
    return (
      <section ref={goToWriteOffSection} className="section">
        <div className="section-title">Write Off</div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section ref={goToWriteOffSection} className="section">
      <div className="section-title">Write Off</div>
      <div className="section-divider"></div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />

        <div className="table-figure-container">
          <div rules="all" className="section-table">
            <TableRow
              item={FormatDate(full?.WriteOffDate)}
              title="Date"
              colour="#6f508c"
              last={false}
            >
              {FormatDate(full?.WriteOffDate)}
            </TableRow>
            <TableRow
              item={full?.WriteOffCategory}
              title="Category"
              colour="#6f508c"
              last={false}
            >
              {full?.WriteOffCategory}
            </TableRow>
            <TableRow
              item={full?.WriteOffRecordCount}
              title="Record Count"
              colour="#6f508c"
              last={true}
            >
              {full?.WriteOffRecordCount}
            </TableRow>
          </div>
        </div>
        {full.WriteOffRecordList > 0 ? (
          <>
            {full.WriteOffRecordList.map((x, i) => {
              return (
                <div className="table-figure-container">
                  <table
                    style={{ width: "100%" }}
                    rules="all"
                    className="section-table"
                  >
                    <tbody>{/* TODO: Needs to be checked and added */}</tbody>
                  </table>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default WriteOff;
