import React from "react";
import TableRow from "./TableRow";
import FormatDate from "../../../auxiliaryFunctions/dateFunctions";
import {
  CalculateTaxDaysLeft,
  CalculateTaxSingle12MonthPayment,
} from "../../../auxiliaryFunctions/orderFunctions";

const TAX = ({ free, basic, full, aiContent, goToTAXSection }) => {
  return (
    <section ref={goToTAXSection} className="section">
      <div className="section-title">TAX</div>
      <div className="section-divider"></div>
      <div className="section-content">
        {aiContent && (
          <div className="ai-summary-container">
            <div className="ai-summary-content">{aiContent}</div>
            <div className="ai-summary-by">Powered By ChadGPT</div>
          </div>
        )}
        <div className="table-figure-container">
          <table rules="all" className="section-table">
            <tbody>
              <TableRow item={free.TaxDueDate} title="Tax Status">
                {FormatDate(free.TaxDueDate)}
              </TableRow>
              <TableRow item={free.TaxDueDate} title="Days Left">
                {CalculateTaxDaysLeft(free.TaxDueDate) > 0 ? (
                  <>{CalculateTaxDaysLeft(free.TaxDueDate)} days left</>
                ) : (
                  <>
                    {CalculateTaxDaysLeft(free.TaxDueDate) * -1} days too late
                  </>
                )}
              </TableRow>
            </tbody>
          </table>
        </div>
        <div className="table-figure-container">
          <table rules="all" className="section-table">
            <tbody>
              <TableRow
                item={basic.VehicleRegistration.VehicleClass}
                title="Vehicle Class"
              >
                {basic.VehicleRegistration.VehicleClass}
              </TableRow>
              <TableRow
                item={basic.VehicleRegistration.Co2Emissions}
                title="CO2 Emissions"
              >
                {basic.VehicleRegistration.Co2Emissions}g/km
              </TableRow>
              <TableRow
                item={CalculateTaxSingle12MonthPayment(
                  basic.VehicleRegistration.VehicleClass,
                  basic.VehicleRegistration.Co2Emissions,
                  basic.ClassificationDetails.Ukvd.IsElectricVehicle,
                  full.FuelType
                )}
                title="Single 12 Months Payment"
              >
                {CalculateTaxSingle12MonthPayment(
                  basic.VehicleRegistration.VehicleClass,
                  basic.VehicleRegistration.Co2Emissions,
                  basic.ClassificationDetails.Ukvd.IsElectricVehicle,
                  full.FuelType
                )}
              </TableRow>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TAX;
