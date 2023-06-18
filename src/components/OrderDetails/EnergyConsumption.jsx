import React from "react";
import TableRow from "./TableRow";

const EnergyConsumption = ({ basic, aiContent }) => {
  return (
    <section className="section">
      <div className="section-title">Energy & Consumption</div>
      <div className="section-divider"></div>
      <div className="section-content">
        {aiContent ? (
          <div className="ai-summary-container">
            <div className="ai-summary-content">{aiContent}</div>
            <div className="ai-summary-by">Powered By ChatGPT</div>
          </div>
        ) : null}
        <div className="table-figure-container">
          <table rules="all" className="section-table">
            <tbody>
              <TableRow
                item={basic.TechnicalDetails.Performance.Power}
                title="Power"
              >
                {basic.TechnicalDetails.Performance.Power.Bhp} BHP
                {" / "}
                {basic.TechnicalDetails.Performance.Power.Kw} KW
                {" / "}
                {basic.TechnicalDetails.Performance.Power.Rpm} RPM
              </TableRow>
              <TableRow
                item={basic.TechnicalDetails.Performance.Torque}
                title="Torque"
              >
                {basic.TechnicalDetails.Performance.Torque.Nm} Nm at
                {basic.TechnicalDetails.Performance.Torque.Rpm} RPM
              </TableRow>
              <TableRow
                item={basic.TechnicalDetails.General.Engine.NumberOfCylinders}
                title="Cylinders"
              >
                {basic.TechnicalDetails.General.Engine.NumberOfCylinders}
              </TableRow>
              <TableRow
                item={basic.TechnicalDetails.Consumption.UrbanCold.Mpg}
                title="Urban"
              >
                {basic.TechnicalDetails.Consumption.UrbanCold.Mpg} Mpg
              </TableRow>
              <TableRow
                item={basic.TechnicalDetails.Consumption.ExtraUrban.Mpg}
                title="Extra Urban"
              >
                {basic.TechnicalDetails.Consumption.ExtraUrban.Mpg} Mpg
              </TableRow>
              <TableRow
                item={basic.TechnicalDetails.Consumption.Combined.Mpg}
                title="Combined"
              >
                {basic.TechnicalDetails.Consumption.Combined.Mpg} Mpg
              </TableRow>
              <TableRow
                item={basic.TechnicalDetails.Performance.Co2}
                title='CO<span style={{ fontSize: "0.70rem" }}>2</span> Emissions'
              >
                {basic.TechnicalDetails.Performance.Co2} g/Km
              </TableRow>
            </tbody>
          </table>
          {/* TODO: IMPLEMENT THE EMISSIONS FIGURE */}
        </div>
      </div>
      <div>
        {/* TODO: Calculate Tax for 12 months */}
        {/* TODO: Calculate Tax for 6 months */}
        {/* TODO: Calculate Fuel Cost for 12,000 miles */}
      </div>
    </section>
  );
};

export default EnergyConsumption;
