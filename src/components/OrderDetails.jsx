import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Box from "@mui/material/Box";
import {
  CapitalizeEachWord,
  GetOrdinalSuffix,
} from "../auxiliaryFunctions/stringFunctions";
import {
  CalcAvgMileAYear,
  CalcLastYearMile,
} from "../auxiliaryFunctions/mathFunctions";

const OrderDetails = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [free, setVehicleFreeData] = useState(null);
  const [basic, setVehicleAndMotHistory] = useState(null);
  const [full, setVdiCheckFull] = useState(null);

  const goToMileageSection = React.useRef();
  const goTokeeperSection = React.useRef();

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const orderRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(orderRef);

      if (docSnap.exists()) {
        setOrder(docSnap.data());
        setVehicleFreeData(docSnap.data().vehicleFreeData);
        setVehicleAndMotHistory(docSnap.data().data.VehicleAndMotHistory);
        setVdiCheckFull(docSnap.data().data.VdiCheckFull);
      } else {
        console.log("No such order!");
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="order-details">
        {order ? (
          <div>
            {/* VEHICLE MAIN */}
            <section>
              {free.RegistrationNumber && (
                <div>Registration Number: {free.RegistrationNumber}</div>
              )}
              {basic.VehicleRegistration.MakeModel && (
                <div>
                  Make and Model:{" "}
                  {CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}
                </div>
              )}
              {CapitalizeEachWord(full.Colour)}
              {order.dateTime && (
                <div>
                  Date and Time: {new Date(order.dateTime).toLocaleString()}
                </div>
              )}
              {full.FuelType && (
                <div>Fuel Type: {CapitalizeEachWord(full.FuelType)}</div>
              )}
            </section>
            {/* SUMMARY */}
            <section>
              <h2>Report Summary</h2>
              <div>PASS</div>
            </section>
            {/* VEHICLE IDENTITY */}
            <section>
              <h2>Vehicle Identity</h2>
              {/* VEHICLE IDENTITY - REGISTRATION NUMBER */}
              {free.RegistrationNumber && (
                <div>Registration Number: {free.RegistrationNumber}</div>
              )}
              {/* VEHICLE IDENTITY - VEHICLE */}
              {basic.VehicleRegistration.MakeModel && (
                <div>
                  Vehicle:
                  {basic.VehicleRegistration.MakeModel}
                </div>
              )}
              {/* VEHICLE IDENTITY - BODY STYLE */}
              {(basic.VehicleRegistration.DoorPlanLiteral ||
                basic.VehicleRegistration.SeatingCapacity) && (
                <div>
                  Body Style: {basic.VehicleRegistration.DoorPlanLiteral},{" "}
                  {basic.VehicleRegistration.SeatingCapacity} Seats
                </div>
              )}
              {/* VEHICLE IDENTITY - TAX */}
              <div>
                {free.TaxStatus === "Taxed" ? (
                  <div>Taxed</div>
                ) : (
                  <div>Not Taxed</div>
                )}
                {free.TaxDueDate && (
                  <div>
                    {new Date(free.TaxDueDate).getMonth() -
                      new Date().getMonth() >=
                    0 ? (
                      <div>
                        Tax Due in{" "}
                        {Math.abs(
                          new Date(free.TaxDueDate).getMonth() -
                            new Date().getMonth()
                        )}{" "}
                        months
                      </div>
                    ) : (
                      <div>
                        Tax Due date has passed by{" "}
                        {Math.abs(
                          new Date(free.TaxDueDate).getMonth() -
                            new Date().getMonth()
                        )}{" "}
                        months
                      </div>
                    )}
                  </div>
                )}
                {free.TaxDueDate && (
                  <div>
                    Tax Due Date:{" "}
                    {new Date(free.TaxDueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
              {/* VEHICLE IDENTITY - MOT */}
              <div>
                {free.MotStatus === "Valid" ? (
                  <div>Valid</div>
                ) : (
                  <div>Not Valid</div>
                )}
                {free.MotExpiryDate && (
                  <div>
                    {new Date(free.MotExpiryDate).getMonth() -
                      new Date().getMonth() >=
                    0 ? (
                      <div>
                        MOT Due in{" "}
                        {Math.abs(
                          new Date(free.MotExpiryDate).getMonth() -
                            new Date().getMonth()
                        )}{" "}
                        months
                      </div>
                    ) : (
                      <div>
                        MOT Due date has passed by{" "}
                        {Math.abs(
                          new Date(free.MotExpiryDate).getMonth() -
                            new Date().getMonth()
                        )}{" "}
                        months
                      </div>
                    )}
                  </div>
                )}
                {free.MotExpiryDate && (
                  <div>
                    MOT Due Date:{" "}
                    {new Date(free.MotExpiryDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </section>
            {/* VEHICLE HISTORY */}
            <section>
              <h2>Vehicle History</h2>
              {/* VEHICLE HISTORY - OUTSTANDING FINANCE */}
              <div>
                <div>Outstanding Finance</div>
                {full.FinanceRecordCount === 0 ? (
                  <div>
                    <div>Pass</div>
                    <div>
                      No outstanding finance recorded against this vehicle
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>Fail</div>
                    {full.FinanceRecordList.map((x, i) => (
                      <div key={i}>
                        <div>
                          Agreement Date:{" "}
                          {new Date(x.AgreementDate).toLocaleDateString()}
                        </div>
                        <div>Agreement Number: {x.AgreementNumber}</div>
                        <div>Agreement Term: {x.AgreementTerm}</div>
                        <div>Agreement Type: {x.AgreementType}</div>
                        <div>Contact Number: {x.ContactNumber}</div>
                        <div>Finance Company: {x.FinanceCompany}</div>
                        <div>Vehicle Description: {x.VehicleDescription}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* VEHICLE HISTORY - WRITTEN OFF */}
              <div>
                <div>Written Off</div>
                {full.WrittenOff === false && full.WriteOffRecordCount === 0 ? (
                  <div>
                    <div>Pass</div>
                    <div>
                      No write off history recorded against this vehicle
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>Fail</div>
                    <div>
                      Date: {new Date(full.WriteOffDate).toLocaleDateString()}
                    </div>
                    <div>Category: {full.WriteOffCategory}</div>
                    <div>Record Count: {full.WriteOffRecordCount}</div>
                    {full.WriteOffRecordList.map((x, i) => (
                      <div key={i}>
                        {/* TODO: Needs to be checked and added */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* VEHICLE HISTORY - IMPORTED / EXPORTED */}
              <div>
                <div>Imported / Exported</div>
                {full.Imported === false && full.Exported === false ? (
                  <div>
                    <div>Pass</div>
                    <div>
                      No import / export history recorded against this vehicle
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>Fail</div>
                    <div>
                      {full.DateFirstRegistered && (
                        <>
                          Date First Registered:{" "}
                          {new Date(
                            full.DateFirstRegistered
                          ).toLocaleDateString()}
                        </>
                      )}
                      {full.DateFirstRegisteredUk && (
                        <>
                          Date First Registered in the UK:{" "}
                          {new Date(
                            full.DateFirstRegisteredUk
                          ).toLocaleDateString()}
                        </>
                      )}
                      {full.Imported && <>Imported: {full.Imported}</>}
                      {full.ImportDate && (
                        <>
                          Import Date:{" "}
                          {new Date(full.ImportDate).toLocaleDateString()}
                        </>
                      )}
                      {full.ImportUsedBeforeUkRegistration && (
                        <>
                          Import used before UK Registration:{" "}
                          {full.ImportUsedBeforeUkRegistration}
                        </>
                      )}
                      {full.ImportedFromOutsideEu && (
                        <>
                          Imported from Outside EU: {full.ImportedFromOutsideEu}
                        </>
                      )}
                    </div>
                    <div>
                      {full.Exported && <>Exported: {full.Exported}</>}
                      {full.ExportDate && (
                        <>
                          Export Date:{" "}
                          {new Date(full.ExportDate).toLocaleDateString()}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* VEHICLE HISTORY - SCRAPPED */}
              <div>
                <div>Scrapped</div>
                {full.Scrapped === false ? (
                  <div>
                    <div>Pass</div>
                    <div>No scrapped history recorded against this vehicle</div>
                  </div>
                ) : (
                  <div>
                    <div>Fail</div>
                    <div>
                      Date: {new Date(full.ScrapDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
              {/* VEHICLE HISTORY - VIC INSPECTED */}
              <div>
                <div>VIC Inspected</div>
                {full.VicTested === false || full.VicTested === null ? (
                  <div>
                    <div>Pass</div>
                  </div>
                ) : (
                  <div>
                    <div>Fail</div>
                    <div>
                      VIC Tested: {full.VicTested}
                      {full.VicTestDate && (
                        <>
                          VIC Test Date:{" "}
                          {new Date(full.VicTestDate).toLocaleDateString()}
                        </>
                      )}
                      {full.VicTestResult && (
                        <>VIC Test Result: {full.VicTestResult}</>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* VEHICLE HISTORY - COLOUR CHANGES */}
              <div>
                <div>Colour Changes</div>
                {basic.VehicleHistory.ColourChangeCount === null ||
                basic.VehicleHistory.ColourChangeCount === 0 ? (
                  <div>
                    <div>Pass</div>
                    <div>
                      No colour change history recorded against this vehicle
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>Fail</div>
                    <div>
                      Colour Change Count:{" "}
                      {basic.VehicleHistory.ColourChangeCount}
                    </div>
                    {basic.VehicleHistory.ColourChangeList.map((x, i) => (
                      <div key={i}>
                        {/* TODO: Needs to be checked and added */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* VEHICLE HISTORY - PLATE CHANGES */}
              <div>
                <div>Plate Changes</div>
                {full.PlateChangeCount === null ||
                full.PlateChangeCount === 0 ? (
                  <div>
                    <div>Pass</div>
                    <div>
                      No plate change history recorded against this vehicle
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>Fail</div>
                    <div>
                      Plate Change Count: {full.PlateChangeCount}
                      {full.PlateChangeList.map((x, i) => (
                        <div key={i}>
                          <div>Date Changed: {x.DateChanged}</div>
                          <div>Previous VRM: {x.PreviousVrm}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* VEHICLE HISTORY - STOLEN */}
              <div>
                <div>Stolen</div>
                {full.Stolen === false || full.Stolen === null ? (
                  <div>
                    <div>Pass</div>
                    <div>No stolen history recorded against this vehicle</div>
                  </div>
                ) : (
                  <div>
                    <div>Fail</div>
                    <div>
                      Stolen: {full.Stolen}
                      {full.StolenStatus && (
                        <>Stolen Status: {full.StolenStatus}</>
                      )}
                      {full.StolenContactNumber && (
                        <>Stolen Contact Number: {full.StolenContactNumber}</>
                      )}
                      {full.StolenDate && (
                        <>
                          Stolen Date:{" "}
                          {new Date(full.StolenDate).toLocaleDateString()}
                        </>
                      )}
                      {full.StolenPoliceForce && (
                        <>Stolen Police Force: {full.StolenPoliceForce}</>
                      )}
                      {full.StolenInfoSource && (
                        <>Stolen Info Source: {full.StolenInfoSource}</>
                      )}
                      {(full.StolenMiaftrRecordCount === 0 ||
                        full.StolenMiaftrRecordCount === null) && (
                        <div>
                          {full.StolenMiaftrRecordList.map((x, i) => (
                            <div key={i}>
                              {/* TODO: Needs to be checked and added */}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* VEHICLE HISTORY - MILEAGE */}
              <div>
                <div>Mileage</div>
                {full.MileageAnomalyDetected === false ||
                full.MileageAnomalyDetected === null ? (
                  <div>
                    <div>Pass</div>
                    <div>No mileage anomaly detected against this vehicle</div>
                  </div>
                ) : (
                  <div>
                    <div>Fail</div>
                    <div>
                      Mileage Anomaly Detected: {full.MileageAnomalyDetected}
                      <button onClick={() => scrollToRef(goToMileageSection)}>
                        Look at the Mileage section below for more information.
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* VEHICLE HISTORY - KEEPERS */}
              <div>
                <div>Keepers</div>
                {full.PreviousKeeperCount === null ||
                full.PreviousKeeperCount === 0 ? (
                  <div>
                    <div>Pass</div>
                    <div>No keeper history recorded against this vehicle</div>
                  </div>
                ) : (
                  <div>
                    <div>Fail</div>
                    <div>Previous Keeper Count: {full.PreviousKeeperCount}</div>
                    <button onClick={() => scrollToRef(goTokeeperSection)}>
                      Look at the Keepers section below for more information.
                    </button>
                  </div>
                )}
              </div>
            </section>
            {/* MILEAGE HISTORY */}
            <section ref={goToMileageSection}>
              <h2>Mileage History</h2>
              <div>
                {full.MileageRecordList &&
                  full.MileageRecordList.map((x, i) => (
                    <div key={i}>
                      <div>
                        Date of Information:{" "}
                        {new Date(x.DateOfInformation).toLocaleDateString()}
                      </div>
                      <div>Mileage: {x.Mileage}</div>
                      <div>Source of Information: {x.SourceOfInformation}</div>
                    </div>
                  ))}
              </div>
              <div>
                {full.MileageRecordList && full.MileageRecordList.length > 0 ? (
                  <div>
                    Last MOT Mileage: {full.MileageRecordList[0].Mileage}
                    <div>
                      Average mileage:{" "}
                      {CalcAvgMileAYear(full.MileageRecordList)} p/year
                    </div>
                    <div>
                      Mileage last year:{" "}
                      {CalcLastYearMile(full.MileageRecordList)} miles
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </section>
            {/* KEEPER HISTORY */}
            <section ref={goTokeeperSection}>
              <h2>Keeper History</h2>
              <div>
                {full.PreviousKeepers === null || full.PreviousKeepers === 0 ? (
                  <div>No keeper history recorded against this vehicle</div>
                ) : (
                  <div>
                    <div>
                      Vehicle first registered: {full.DateFirstRegistered}
                    </div>
                    {full.PreviousKeeperList.map((x, i) => (
                      <div key={i}>
                        {GetOrdinalSuffix(i)}
                        {/*TODO: Needs to be checked and added*/}
                      </div>
                    ))}
                    <div>
                      Total number of keepers: {full.PreviousKeeperCount}{" "}
                      (excluding current keeper).
                    </div>
                  </div>
                )}
              </div>
            </section>
            {/* IMPORTANT CHECKS */}
            <section>
              <h2>Important Checks</h2>
              <div>
                It is important to check the following details before purchasing
                to confirm the vehicle's identity.
              </div>
              <div>VIN last 5 digits: {full.VinLast5}</div>
              <div>Engine number: {basic.VehicleRegistration.EngineNumber}</div>
              <div>V5C date is: {full.LatestV5cIssuedDate}</div>
            </section>
            {/* VEHICLE SPECIFICATION */}
            <section>
              <h2>Vehicle Specification</h2>
              {basic.TechnicalDetails.Dimensions.CarLength && (
                <div>Length: {basic.TechnicalDetails.Dimensions.CarLength}</div>
              )}
              {basic.TechnicalDetails.Dimensions.Width && (
                <div>Width: {basic.TechnicalDetails.Dimensions.Width}</div>
              )}
              {basic.TechnicalDetails.Dimensions.Height && (
                <div>Height: {basic.TechnicalDetails.Dimensions.Height}</div>
              )}
              {basic.TechnicalDetails.Dimensions.WheelBase && (
                <div>
                  Wheel Base: {basic.TechnicalDetails.Dimensions.WheelBase}
                </div>
              )}
              {basic.TechnicalDetails.Dimensions.GrossVehicleWeight && (
                <div>
                  Gross Vehicle Weight:{" "}
                  {basic.TechnicalDetails.Dimensions.GrossVehicleWeight}
                </div>
              )}
            </section>
            {/* VEHICLE PERFORMANCE */}
            <section>
              <h2>Vehicle Performance</h2>
              {basic.TechnicalDetails.Performance.MaxSpeed.Mph && (
                <div>
                  Max Speed: {basic.TechnicalDetails.Performance.MaxSpeed.Mph}{" "}
                  Mph
                </div>
              )}
              {basic.TechnicalDetails.Performance.Acceleration.ZeroTo60Mph && (
                <div>
                  Acceleration (0-60 mph):{" "}
                  {basic.TechnicalDetails.Performance.Acceleration.ZeroTo60Mph}{" "}
                  seconds
                </div>
              )}
              {basic.TechnicalDetails.Performance.Power.Bhp && (
                <div>
                  Power:{" "}
                  {basic.TechnicalDetails.Performance.Power.Bhp.toString()} Bhp
                </div>
              )}
            </section>
            {/* RUNNING COSTS */}
            <section>
              <h2>Running Costs</h2>
              <div>
                *Road tax costs are indicative. You should check with the seller
                or look at the{" "}
                <a href="https://www.gov.uk/vehicle-tax-rate-tables">
                  vehicle tax rates
                </a>{" "}
                table to confirm tax costs.
              </div>
              <div>
                {/* TODO: Calculate Tax for 12 months */}
                {/* TODO: Calculate Tax for 6 months */}
                {/* TODO: Calculate Fuel Cost for 12,000 miles */}
                {basic.TechnicalDetails.Consumption.UrbanCold.Mpg && (
                  <div>
                    Urban: {basic.TechnicalDetails.Consumption.UrbanCold.Mpg}{" "}
                    Mpg
                  </div>
                )}
                {basic.TechnicalDetails.Consumption.ExtraUrban.Mpg && (
                  <div>
                    Extra Urban:{" "}
                    {basic.TechnicalDetails.Consumption.ExtraUrban.Mpg} Mpg
                  </div>
                )}
                {basic.TechnicalDetails.Consumption.Combined.Mpg && (
                  <div>
                    Combined: {basic.TechnicalDetails.Consumption.Combined.Mpg}{" "}
                    Mpg
                  </div>
                )}
              </div>
            </section>
            {/* REGISTRATION HISTORY */}
            <section>
              <h2>Registration History</h2>
              <div>
                {full.DateFirstRegistered && (
                  <div>Date first registered: {full.DateFirstRegistered}</div>
                )}
                {full.YearOfManufacture && (
                  <div>Year of manufacture: {full.YearOfManufacture}</div>
                )}
              </div>
            </section>
            {/* MOT HISTORY */}
            <section>
              <h2>MOT History</h2>
              {(basic.MotHistory.RecordList.length !== 0 ||
                basic.MotHistory.RecordList !== null) && (
                <>
                  {basic.MotHistory.RecordList.map((x, i) => (
                    <div key={i}>
                      <div>Test Date: {x.TestDate}</div>
                      <div>Test Result: {x.TestResult}</div>
                      <div>Mileage: {x.OdometerInMiles} miles</div>
                      {(x.FailureReasonList.length !== 0 ||
                        x.FailureReasonList.length !== null) && (
                        <>
                          <div>
                            Advised on {x.FailureReasonList.length} items:
                          </div>
                          {x.FailureReasonList.map((y, j) => (
                            <div key={j}>{y}</div>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
                </>
              )}
            </section>
            {/* ABOUT THIS REPORT */}
            <section>
              <h2>About this Report</h2>
              <div>
                Date of Registration:{" "}
                {new Date(order.dateTime).toLocaleString()}
              </div>
              <div>Report Reference: {order.orderId}</div>
            </section>
          </div>
        ) : (
          <p>No order selected.</p>
        )}
      </div>
    </Box>
  );
};

export default OrderDetails;
