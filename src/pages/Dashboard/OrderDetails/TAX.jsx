import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";
import {
  CalculateTaxDaysLeft,
  CalculateTaxSingle12MonthPayment,
} from "../../../auxiliaryFunctions/orderFunctions";

const TAX = ({
  free,
  basic,
  full,
  aiContent,
  goToTAXSection,
  aiContentLoading,
  condition,
}) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  return (
    <section ref={goToTAXSection} className="section">
      <div className="section-title">
        <div>TAX</div>
        <div>
          <img
            alt="Google"
            src={iconsUrl + (condition ? "check.svg" : "close.svg")}
            height={40}
          />
        </div>
      </div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />
        <TableRow
          item={free?.TaxDueDate}
          title="Tax Status"
          colour="#6f508c"
          last={false}
        >
          {FormatDate(free?.TaxDueDate)}
        </TableRow>
        <TableRow
          item={free?.TaxDueDate}
          title="Days Left"
          colour="#6f508c"
          last={false}
        >
          {CalculateTaxDaysLeft(free?.TaxDueDate) > 0 ? (
            <>{CalculateTaxDaysLeft(free?.TaxDueDate)} days left</>
          ) : (
            <>{CalculateTaxDaysLeft(free?.TaxDueDate) * -1} days too late</>
          )}
        </TableRow>
        <TableRow
          item={basic?.VehicleRegistration?.VehicleClass}
          title="Vehicle Class"
          colour="#6f508c"
          last={false}
        >
          {basic?.VehicleRegistration?.VehicleClass}
        </TableRow>
        <TableRow
          item={basic?.VehicleRegistration?.Co2Emissions}
          title="CO2 Emissions"
          colour="#6f508c"
          last={false}
        >
          {basic?.VehicleRegistration?.Co2Emissions}g/km
        </TableRow>
        <TableRow
          item={CalculateTaxSingle12MonthPayment(
            basic?.VehicleRegistration?.VehicleClass,
            basic?.VehicleRegistration?.Co2Emissions,
            basic?.ClassificationDetails?.Ukvd?.IsElectricVehicle,
            full?.FuelType
          )}
          title="Single 12 Months Payment"
          colour="#6f508c"
          last={true}
        >
          {CalculateTaxSingle12MonthPayment(
            basic?.VehicleRegistration?.VehicleClass,
            basic?.VehicleRegistration?.Co2Emissions,
            basic?.ClassificationDetails?.Ukvd?.IsElectricVehicle,
            full?.FuelType
          )}
        </TableRow>
      </div>
    </section>
  );
};

export default TAX;
