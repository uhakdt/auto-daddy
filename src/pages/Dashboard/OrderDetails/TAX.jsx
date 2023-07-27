import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";

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
          <div className="section-table">
            <TableRow
              item={free.TaxDueDate}
              title="Tax Status"
              colour="#6f508c"
              last={false}
            >
              {FormatDate(free.TaxDueDate)}
            </TableRow>
            <TableRow
              item={free.TaxDueDate}
              title="Days Left"
              colour="#6f508c"
              last={true}
            >
              {CalculateTaxDaysLeft(free.TaxDueDate) > 0 ? (
                <>{CalculateTaxDaysLeft(free.TaxDueDate)} days left</>
              ) : (
                <>{CalculateTaxDaysLeft(free.TaxDueDate) * -1} days too late</>
              )}
            </TableRow>
          </div>
        </div>
        <div className="table-figure-container">
          <div className="section-table">
            <TableRow
              item={basic.VehicleRegistration.VehicleClass}
              title="Vehicle Class"
              colour="#6f508c"
              last={false}
            >
              {basic.VehicleRegistration.VehicleClass}
            </TableRow>
            <TableRow
              item={basic.VehicleRegistration.Co2Emissions}
              title="CO2 Emissions"
              colour="#6f508c"
              last={false}
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
              colour="#6f508c"
              last={true}
            >
              {CalculateTaxSingle12MonthPayment(
                basic.VehicleRegistration.VehicleClass,
                basic.VehicleRegistration.Co2Emissions,
                basic.ClassificationDetails.Ukvd.IsElectricVehicle,
                full.FuelType
              )}
            </TableRow>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TAX;
