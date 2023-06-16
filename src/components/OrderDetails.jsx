import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import Box from "@mui/material/Box";
import {
  CapitalizeEachWord,
  GetOrdinalSuffix,
} from "../auxiliaryFunctions/stringFunctions";
import {
  CalcAvgMileAYear,
  CalcLastYearMile,
} from "../auxiliaryFunctions/mathFunctions";
import FormatDate from "../auxiliaryFunctions/dateFunctions";
import Snackbar from "@mui/material/Snackbar";
import "./OrderDetails.css";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import {
  CalculateMOTPassRate,
  CalculateMOTFailedTests,
  CalculateTotalAdviceItems,
  CalculateTotalAdviceItemsFailed,
  CalculateTaxDaysLeft,
  CalculateTaxSingle12MonthPayment,
} from "../auxiliaryFunctions/orderFunctions";

const auth = getAuth();

const aiContentListSample = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum odio luctus feugiat cursus. Praesent aliquam augue nulla, a porttitor justo pellentesque sit amet. Fusce ac sem sit amet ante sagittis condimentum. Fusce sit amet erat magna. Etiam vehicula lectus orci, eget bibendum mi scelerisque nec. Aliquam nec blandit risus. Mauris pretium ornare ornare. Curabitur molestie purus est, at aliquam diam porttitor eget. Mauris malesuada, ante ac blandit ultrices, lacus mauris laoreet ex, id tempor erat sem a justo.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum ipsum quis magna feugiat, sed interdum nunc aliquet. Ut hendrerit bibendum consequat.",
];

const OrderDetails = ({ orderId }) => {
  const [aiContentList, setAIContentList] = useState(aiContentListSample);
  const [order, setOrder] = useState(null);
  const [free, setVehicleFreeData] = useState(null);
  const [basic, setVehicleAndMotHistory] = useState(null);
  const [full, setVdiCheckFull] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  console.log("Order: \n", order);
  console.log("Free: \n", free);
  console.log("Basic: \n", basic);
  console.log("Full: \n", full);
  console.log("ImageUrl: \n", imageUrl);

  const [emailStatus, setEmailStatus] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const goToMileageSection = React.useRef();
  const goTokeeperSection = React.useRef();

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchImageUrl = async () => {
      const fileName = `${orderId}_image_0.jpg`;
      const filePath = `user_files/${auth.currentUser.uid}/car_images/${fileName}`;
      const url = await getDownloadURL(ref(storage, filePath));
      setImageUrl(url);
    };

    if (order) fetchImageUrl();
  }, [order]);

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

  const handleDownloadReport = async () => {
    try {
      const vehicleRegMark = free.RegistrationNumber;
      const userId = auth.currentUser.uid;
      const url = `${process.env.REACT_APP_API_URL}/download-report`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, vehicleRegMark, userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { url: downloadUrl } = await response.json();

      // Create new link and trigger click event on it
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.target = "_blank"; // to open in a new tab
      link.download = "report.pdf";
      link.click();
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  const handleEmailReport = async () => {
    try {
      const vehicleRegMark = free.RegistrationNumber;
      const userId = auth.currentUser.uid;
      const email = auth.currentUser.email;

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/email-report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId, vehicleRegMark, userId, email }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setEmailStatus({ success: true, message: result.message });
      setSnackbarOpen(true);
    } catch (err) {
      setEmailStatus({ success: false, message: err.toString() });
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="order-details">
        {order ? (
          <div>
            {/* VEHICLE MAIN */}
            <section className="section">
              <div className="section-title">
                {basic.VehicleRegistration.MakeModel ? (
                  <div>
                    {CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="section-divider"></div>
              <div className="section-content">
                {free.RegistrationNumber ? (
                  <div className="registration-number-container">
                    <div className="registration-number-gb">GB</div>
                    <div className="registration-number-content">
                      {free.RegistrationNumber}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <button className="button" onClick={handleDownloadReport}>
                  Download Report
                </button>
                <button className="button" onClick={handleEmailReport}>
                  Email Report
                </button>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={2000}
                  onClose={handleSnackbarClose}
                  message={emailStatus?.message}
                />
              </div>
            </section>
            {/* SUMMARY */}
            <section className="section">
              <div className="section-title">
                AutoDaddy <br />
                <span className="section-title-sub">AI Summary</span>
              </div>
              <div className="section-divider"></div>
              <div className="section-content">
                {/* SUMMARY - AI SUMMARY */}
                {aiContentList[0] ? (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[0]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </section>
            {/* STATUS WINDOWS */}
            <section className="status-windows-container">
              {/* STATUS WINDOWS - TAX */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    free.TaxStatus === "Taxed" ? "#e1f909" : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">TAX</div>
                  <div className="status-window-details">
                    Expires: <br />
                    {FormatDate(free.TaxDueDate)}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - MOT */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    free.MotStatus === "Valid" ? "#e1f909" : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">MOT</div>
                  <div className="status-window-details">
                    Expires: <br />
                    {FormatDate(free.MotExpiryDate)}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - FINANCES */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    full.FinanceRecordCount === 0 ? "#e1f909" : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">Finances</div>
                  <div className="status-window-details">
                    {full.FinanceRecordCount === 0 ? (
                      <>No Records</>
                    ) : (
                      <>
                        Number of Records:{" "}
                        <span className="status-window-details-count">
                          {full.FinanceRecordCount}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - WRITE OFF */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    full.WrittenOff === false && full.WriteOffRecordCount === 0
                      ? "#e1f909"
                      : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">Write Off</div>
                  <div className="status-window-details">
                    {full.WriteOffRecordCount === 0 ? (
                      <>No Records</>
                    ) : (
                      <>
                        Number of Records:{" "}
                        <span>{full.WriteOffRecordCount}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - IMPORTED / EXPORTED */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    full.Imported === false && full.Exported === false
                      ? "#e1f909"
                      : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">Export</div>
                  <div className="status-window-details">
                    {full.Imported === false && full.Exported === false ? (
                      <>No Records</>
                    ) : (
                      <>Click to View Details</>
                    )}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - SCRAPPED */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    full.Scrapped === false ? "#e1f909" : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">Scrapped</div>
                  <div className="status-window-details">
                    {full.Scrapped === false ? (
                      <>No Records</>
                    ) : (
                      <>
                        Scrap Date: <br />
                        {FormatDate(full.ScrapDate)}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - VIC INSPECTED */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    full.VicTested === false || full.VicTested === null
                      ? "#e1f909"
                      : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">VIC</div>
                  <div className="status-window-details">
                    {full.VicTested === false || full.VicTested === null ? (
                      <>No Records</>
                    ) : (
                      <>Click to View Details</>
                    )}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - COLOUR CHANGES */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    basic.VehicleHistory.ColourChangeCount === null ||
                    basic.VehicleHistory.ColourChangeCount === 0
                      ? "#e1f909"
                      : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">Colour</div>
                  <div className="status-window-details">
                    {basic.VehicleHistory.ColourChangeCount === null ||
                    basic.VehicleHistory.ColourChangeCount === 0 ? (
                      <>No Records</>
                    ) : (
                      <>
                        Number of Records:{" "}
                        <span className="status-window-details-count">
                          {basic.VehicleHistory.ColourChangeCount}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - PLATE CHANGES */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    full.PlateChangeCount === null ||
                    full.PlateChangeCount === 0
                      ? "#e1f909"
                      : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">Plate</div>
                  <div className="status-window-details">
                    {full.PlateChangeCount === null ||
                    full.PlateChangeCount === 0 ? (
                      <>No Records</>
                    ) : (
                      <>
                        Number of Records:{" "}
                        <span className="status-window-details-count">
                          {full.PlateChangeCount}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - STOLEN */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    full.Stolen === false || full.Stolen === null
                      ? "#e1f909"
                      : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">Stolen</div>
                  <div className="status-window-details">
                    {full.Stolen === false || full.Stolen === null ? (
                      <>No Records</>
                    ) : (
                      <>Click to View Details</>
                    )}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - MILEAGE */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    full.MileageAnomalyDetected === false ||
                    full.MileageAnomalyDetected === null
                      ? "#e1f909"
                      : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">Mileage</div>
                  <div className="status-window-details">
                    {full.MileageAnomalyDetected === false ||
                    full.MileageAnomalyDetected === null ? (
                      <>No Records</>
                    ) : (
                      <>Click to View Details</>
                    )}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - KEEPERS */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    full.PreviousKeeperCount === null ||
                    full.PreviousKeeperCount === 0
                      ? "#e1f909"
                      : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">Keepers</div>
                  <div className="status-window-details">
                    {full.PreviousKeeperCount === null ||
                    full.PreviousKeeperCount === 0 ? (
                      <>No Records</>
                    ) : (
                      <>
                        Number of Records:{" "}
                        <span className="status-window-details-count">
                          {full.PreviousKeeperCount}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* STATUS WINDOWS - V5C */}
              <div
                className="status-window"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${
                    full.LatestV5cIssuedDate != null ? "#e1f909" : "#f6514b"
                  } 1rem, white 1rem`,
                }}
              >
                <div className="status-window-content">
                  <div className="status-window-title">V5C</div>
                  <div className="status-window-details">
                    Date Issued: <br />
                    {FormatDate(full.LatestV5cIssuedDate)}
                  </div>
                </div>
              </div>
            </section>
            {/* VEHICLE DETAILS */}
            <section className="section">
              <div className="section-title">
                {CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}
                <br />
                <span className="section-title-sub">Details</span>
              </div>
              <div className="section-divider"></div>
              <div className="section-content">
                {/* VEHICLE DETAILS - AI SUMMARY */}
                {aiContentList[0] ? (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[1]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="table-figure-container">
                  <table rules="all" className="section-table">
                    <tbody>
                      {/* VEHICLE DETAILS - MODEL */}
                      {basic.VehicleRegistration.MakeModel ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">Model</td>
                          <td>
                            {CapitalizeEachWord(
                              basic.VehicleRegistration.MakeModel
                            )}
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* VEHICLE DETAILS - FUEL TYPE */}
                      {free.FuelType ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Fuel Type
                          </td>
                          <td>{CapitalizeEachWord(free.FuelType)}</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* VEHICLE DETAILS - COLOUR */}
                      {free.Colour ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Colour
                          </td>
                          <td>{CapitalizeEachWord(free.Colour)}</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* VEHICLE DETAILS - ENGINE */}
                      {free.EngineCapacity ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Engine
                          </td>
                          <td>{free.EngineCapacity} cc</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* VEHICLE DETAILS - GEARBOX */}
                      {basic.SmmtDetails.Transmission &&
                      basic.SmmtDetails.NumberOfGears ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Gearbox
                          </td>
                          <td>
                            {basic.SmmtDetails.NumberOfGears} speed{" "}
                            {CapitalizeEachWord(basic.SmmtDetails.Transmission)}
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* VEHICLE DETAILS - ACCELERATION */}
                      {basic.TechnicalDetails.Performance.Acceleration
                        .ZeroTo60Mph ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Acceleration
                          </td>
                          <td>Column 3, Row 2</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* VEHICLE DETAILS - TOP SPEED */}
                      {basic.TechnicalDetails.Performance.MaxSpeed.Mph ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Top Speed
                          </td>
                          <td>
                            {basic.TechnicalDetails.Performance.MaxSpeed.Mph}{" "}
                            Mph
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  {/* VEHICLE DETAILS - FIGURE */}
                  {imageUrl ? (
                    <div>
                      <img width={"100%"} src={imageUrl} alt="Car" />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* VEHICLE DETAILS - REGISTRATION NUMBER */}
              {/* {free.RegistrationNumber && (
                <div>Registration Number: {free.RegistrationNumber}</div>
              )} */}
              {/* VEHICLE DETAILS - VEHICLE */}
              {/* {basic.VehicleRegistration.MakeModel && (
                <div>
                  Vehicle:
                  {CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}
                </div>
              )} */}
              {/* VEHICLE DETAILS - BODY STYLE */}
              {/* {(basic.VehicleRegistration.DoorPlanLiteral ||
                basic.VehicleRegistration.SeatingCapacity) && (
                <div>
                  Body Style:{" "}
                  {CapitalizeEachWord(
                    basic.VehicleRegistration.DoorPlanLiteral
                  )}
                  , {basic.VehicleRegistration.SeatingCapacity} Seats
                </div>
              )} */}
              {/* VEHICLE DETAILS - TAX */}
              {/* <div>
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
              </div> */}
              {/* VEHICLE DETAILS - MOT */}
              {/* <div>
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
              </div> */}
            </section>
            {/* ENERGY & CONSUMPTION */}
            <section className="section">
              <div className="section-title">Energy & Consumption</div>
              <div className="section-divider"></div>
              <div className="section-content">
                {/* ENERGY & CONSUMPTION - AI SUMMARY */}
                {aiContentList[0] ? (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[0]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="table-figure-container">
                  <table rules="all" className="section-table">
                    <tbody>
                      {/* ENERGY & CONSUMPTION - POWER */}
                      {basic.TechnicalDetails.Performance.Power.Bhp &&
                      basic.TechnicalDetails.Performance.Power.Kw &&
                      basic.TechnicalDetails.Performance.Power.Rpm ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">Power</td>
                          <td>
                            {basic.TechnicalDetails.Performance.Power.Bhp} BHP
                            {" / "}
                            {basic.TechnicalDetails.Performance.Power.Kw} KW
                            {" / "}
                            {basic.TechnicalDetails.Performance.Power.Rpm} RPM
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* ENERGY & CONSUMPTION - TORQUE */}
                      {basic.TechnicalDetails.Performance.Torque.Nm &&
                      basic.TechnicalDetails.Performance.Torque.Rpm ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Torque
                          </td>
                          <td>
                            {basic.TechnicalDetails.Performance.Torque.Nm} Nm at{" "}
                            {basic.TechnicalDetails.Performance.Torque.Rpm}{" "}
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* ENERGY & CONSUMPTION - CYLINDERS */}
                      {basic.TechnicalDetails.General.Engine
                        .NumberOfCylinders ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Cylinders
                          </td>
                          <td>
                            {
                              basic.TechnicalDetails.General.Engine
                                .NumberOfCylinders
                            }
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* ENERGY & CONSUMPTION - URBAN */}
                      {basic.TechnicalDetails.Consumption.UrbanCold.Mpg ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">Urban</td>
                          <td>
                            {basic.TechnicalDetails.Consumption.UrbanCold.Mpg}{" "}
                            Mpg
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* ENERGY & CONSUMPTION - EXTRA URBAN */}
                      {basic.TechnicalDetails.Consumption.ExtraUrban.Mpg ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Extra Urban
                          </td>
                          <td>
                            {basic.TechnicalDetails.Consumption.ExtraUrban.Mpg}{" "}
                            Mpg
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* ENERGY & CONSUMPTION - COMBINED */}
                      {basic.TechnicalDetails.Consumption.Combined.Mpg ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Combined
                          </td>
                          <td>
                            {basic.TechnicalDetails.Consumption.Combined.Mpg}{" "}
                            Mpg
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* ENERGY & CONSUMPTION - CO2 EMISSIONS */}
                      {basic.TechnicalDetails.Performance.MaxSpeed.Mph ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            CO<span style={{ fontSize: "0.70rem" }}>2</span>{" "}
                            Emissions
                          </td>
                          <td>{basic.TechnicalDetails.Performance.Co2} g/Km</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  {/* ENERGY & CONSUMPTION - FIGURE */}
                  {/* TODO: IMPLEMENT THE EMISSIONS FIGURE*/}
                  {/* <div>
                    <EmissionsLabel
                      width={"100%"}
                      emission={basic.TechnicalDetails.Performance.Co2}
                    />
                  </div> */}
                </div>
              </div>
              {/* <div>
                *Road tax costs are indicative. You should check with the seller
                or look at the{" "}
                <a href="https://www.gov.uk/vehicle-tax-rate-tables">
                  vehicle tax rates
                </a>{" "}
                table to confirm tax costs.
              </div> */}
              <div>
                {/* TODO: Calculate Tax for 12 months */}
                {/* TODO: Calculate Tax for 6 months */}
                {/* TODO: Calculate Fuel Cost for 12,000 miles */}
                {/* {basic.TechnicalDetails.Consumption.UrbanCold.Mpg && (
                  <div>
                    Urban: {basic.TechnicalDetails.Consumption.UrbanCold.Mpg}{" "}
                    Mpg
                  </div>
                )} */}
                {/* {basic.TechnicalDetails.Consumption.ExtraUrban.Mpg && (
                  <div>
                    Extra Urban:{" "}
                    {basic.TechnicalDetails.Consumption.ExtraUrban.Mpg} Mpg
                  </div>
                )} */}
                {/* {basic.TechnicalDetails.Consumption.Combined.Mpg && (
                  <div>
                    Combined: {basic.TechnicalDetails.Consumption.Combined.Mpg}{" "}
                    Mpg
                  </div>
                )} */}
              </div>
            </section>
            {/* MOT */}
            <section className="section">
              <div className="section-title">MOT</div>
              <div className="section-divider"></div>
              <div className="section-content">
                {/* MOT - AI SUMMARY */}
                {aiContentList[0] ? (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[0]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                ) : (
                  <></>
                )}
                {/* MOT - SUMMARY */}
                <div className="table-figure-container">
                  <table rules="all" className="section-table">
                    <tbody>
                      {/* MOT - SUMMARY - PASS RATE */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Pass Rate
                        </td>
                        <td>
                          {basic.MotHistory.RecordList.length ? (
                            <>
                              {CalculateMOTPassRate(
                                basic.MotHistory.RecordList
                              )}
                            </>
                          ) : (
                            <>No MOT History</>
                          )}
                        </td>
                      </tr>
                      {/* MOT - SUMMARY - FAILED TESTS */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Failed Tests
                        </td>
                        <td>
                          {CalculateMOTFailedTests(basic.MotHistory.RecordList)}
                        </td>
                      </tr>
                      {/* MOT - SUMMARY - TOTAL ADVISE ITEMS */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Total Advice Items
                        </td>
                        <td>
                          {CalculateTotalAdviceItems(
                            basic.MotHistory.RecordList
                          )}
                        </td>
                      </tr>
                      {/* MOT - SUMMARY - TOTAL ADVISE ITEMS FAILED */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Total Items Failed
                        </td>
                        <td>
                          {CalculateTotalAdviceItemsFailed(
                            basic.MotHistory.RecordList
                          )}
                        </td>
                      </tr>
                      {/* MOT - SUMMARY - EXPIRY DATE */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Expiry Date
                        </td>
                        <td>{FormatDate(free.MotExpiryDate)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* MOT - HISTORY */}
                {basic.MotHistory.RecordList.map((x, i) => {
                  return (
                    <div className="table-figure-container">
                      <table
                        style={{ width: "100%" }}
                        rules="all"
                        className="section-table"
                      >
                        <tbody>
                          {/* MOT - HISTORY - NUMBER AND DATE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Test Nr. {i + 1}
                            </td>
                            <td>{FormatDate(x.TestDate)}</td>
                          </tr>
                          {/* MOT - HISTORY - TEST NUMBER */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Test Number
                            </td>
                            <td>{x.TestNumber}</td>
                          </tr>
                          {/* MOT - HISTORY - RESULT */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Test Result
                            </td>
                            <td>{x.TestResult}</td>
                          </tr>
                          {/* MOT - HISTORY - EXPIRY DATE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Expiry Date
                            </td>
                            <td>{FormatDate(x.ExpiryDate)}</td>
                          </tr>
                          {/* MOT - HISTORY - ADVISE ITEMS */}
                          {x.AnnotationDetailsList.map((y, j) => (
                            <tr key={j}>
                              <td className="section-table-first-column">
                                <div
                                  className="section-table-row-status"
                                  style={{
                                    backgroundColor: "rgb(225, 249, 9)",
                                    borderColor: "rgb(121, 130, 45)",
                                  }}
                                ></div>
                              </td>
                              <td className="section-table-second-column">
                                MOT Advise
                              </td>
                              <td>
                                Type: {y.Type} <br /> {y.Text}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            </section>
            {/* TAX */}
            <section className="section">
              <div className="section-title">Tax</div>
              <div className="section-divider"></div>
              <div className="section-content">
                {/* TAX - AI SUMMARY */}
                {aiContentList[0] ? (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[0]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                ) : (
                  <></>
                )}
                {/* TAX - SUMMARY */}
                <div className="table-figure-container">
                  <table rules="all" className="section-table">
                    <tbody>
                      {/* TAX - SUMMARY - STATUS */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Tax Status
                        </td>
                        <td>{FormatDate(free.TaxDueDate)}</td>
                      </tr>
                      {/* TAX - SUMMARY - DAYS LEFT */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Days Left
                        </td>
                        <td>
                          {CalculateTaxDaysLeft(free.TaxDueDate) > 0 ? (
                            <>
                              {CalculateTaxDaysLeft(free.TaxDueDate)} days left
                            </>
                          ) : (
                            <>
                              {CalculateTaxDaysLeft(free.TaxDueDate) * -1} days
                              too late
                            </>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* TAX - DETAILS */}
                <div className="table-figure-container">
                  <table rules="all" className="section-table">
                    <tbody>
                      {/* TAX - DETAILS - VEHICLE CLASS */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Vehicle Class
                        </td>
                        <td>{basic.VehicleRegistration.VehicleClass}</td>
                      </tr>
                      {/* TAX - DETAILS - BAND */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          CO<span style={{ fontSize: "0.70rem" }}>2</span>{" "}
                          Emissions
                        </td>
                        <td>{basic.VehicleRegistration.Co2Emissions}g/km </td>
                      </tr>
                      {/* TAX - DETAILS - SINGLE 12 MONTHS PAYMENT */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Single 12 Months Payment
                        </td>
                        <td>
                          {CalculateTaxSingle12MonthPayment(
                            basic.VehicleRegistration.VehicleClass,
                            basic.VehicleRegistration.Co2Emissions,
                            basic.ClassificationDetails.Ukvd.IsElectricVehicle,
                            full.FuelType
                          )}
                        </td>
                      </tr>
                      {/* TODO: TAX - DETAILS - SINGLE 6 MONTHS PAYMENT */}
                      {/* <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Single 6 Months Payment
                        </td>
                        <td>
                          {CalculateTaxSingle6MonthPayment(
                            basic.VehicleRegistration.VehicleClass,
                            basic.VehicleRegistration.Co2Emissions,
                            basic.ClassificationDetails.Ukvd.IsElectricVehicle,
                            full.FuelType
                          )}
                        </td>
                      </tr> */}
                      {/* TODO: TAX - DETAILS - 12 MONTHS INSTALLMENTS TOTAL PAYMENT */}
                      {/* <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Total payable by 12 monthly installments
                        </td>
                        <td>
                          {CalculateTaxSingle6MonthPayment(
                            basic.VehicleRegistration.VehicleClass,
                            basic.VehicleRegistration.Co2Emissions,
                            basic.ClassificationDetails.Ukvd.IsElectricVehicle,
                            full.FuelType
                          )}
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            {/* MILEAGE */}
            <section className="section">
              <div className="section-title">Mileage</div>
              <div className="section-divider"></div>
              <div className="section-content">
                {/* MILEAGE - AI SUMMARY */}
                {aiContentList[0] ? (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[0]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                ) : (
                  <></>
                )}
                {/* MILEAGE - SUMMARY */}
                <div className="table-figure-container">
                  <table rules="all" className="section-table">
                    <tbody>
                      {/* MILEAGE - SUMMARY - ODOMETER */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Odometer
                        </td>
                        <td>In miles</td>
                      </tr>
                      {/* MILEAGE - SUMMARY - NO OF REGISTRATIONS */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          No. of Registrations
                        </td>
                        <td>{full.MileageRecordCount}</td>
                      </tr>
                      {/* MILEAGE - SUMMARY - ANOMALY DETECTED */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">Anomaly</td>
                        <td>
                          {CapitalizeEachWord(
                            full.MileageAnomalyDetected.toString()
                          )}
                        </td>
                      </tr>
                      {full.MileageRecordList.length > 0 ? (
                        <>
                          {/* MILEAGE - SUMMARY - FIRST REGISTRATION */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              First Registration
                            </td>
                            <td>
                              {
                                full.MileageRecordList[
                                  full.MileageRecordList.length - 1
                                ].DateOfInformation
                              }
                            </td>
                          </tr>
                          {/* MILEAGE - SUMMARY - LAST REGISTRATION */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Last Registration
                            </td>
                            <td>
                              {full.MileageRecordList[0].DateOfInformation}
                            </td>
                          </tr>
                          {/* MILEAGE - SUMMARY - LAST MOT MILEAGE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Last MOT Mileage
                            </td>
                            <td>{full.MileageRecordList[0].Mileage}</td>
                          </tr>
                          {/* MILEAGE - SUMMARY - AVERAGE MILEAGE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Average Mileage
                            </td>
                            <td>
                              {CalcAvgMileAYear(full.MileageRecordList)} p/year
                            </td>
                          </tr>
                          {/* MILEAGE - SUMMARY - MILEAGE LAST YEAR */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Mileage Last Year
                            </td>
                            <td>
                              {CalcLastYearMile(full.MileageRecordList)} miles
                            </td>
                          </tr>
                        </>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* MILEAGE - HISTORY */}
                {full.MileageRecordList.map((x, i) => {
                  return (
                    <div className="table-figure-container">
                      <table
                        style={{ width: "100%" }}
                        rules="all"
                        className="section-table"
                      >
                        <tbody>
                          {/* MILEAGE - HISTORY - DATE OF INFORMATION */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Date of Information
                            </td>
                            <td>{FormatDate(x.DateOfInformation)}</td>
                          </tr>
                          {/* MILEAGE - HISTORY - MILEAGE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Mileage
                            </td>
                            <td>{x.Mileage}</td>
                          </tr>
                          {/* MILEAGE - HISTORY - SOURCE OF INFORMATION */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Source of Information
                            </td>
                            <td>{x.SourceOfInformation}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            </section>
            {/* PLATE CHANGES */}
            <section className="section">
              <div className="section-title">Plate Changes</div>
              <div className="section-divider"></div>
              <div className="section-content">
                {/* PLATE CHANGES - AI SUMMARY */}
                {aiContentList[0] ? (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[0]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                ) : (
                  <></>
                )}
                {/* PLATE CHANGES */}
                {full.PlateChangeList.map((x, i) => {
                  return (
                    <div className="table-figure-container">
                      <table
                        style={{ width: "100%" }}
                        rules="all"
                        className="section-table"
                      >
                        <tbody>
                          {/* PLATE CHANGES - DATE CHANGED */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Date Changed
                            </td>
                            <td>{FormatDate(x.DateChanged)}</td>
                          </tr>
                          {/* PLATE CHANGES - PREVIOUS VRM */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Previous Plate Number
                            </td>
                            <td>{x.PreviousVrm}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            </section>
            {/* OUTSTANDING FINANCES */}
            <section className="section">
              <div className="section-title">Outstanding Finances</div>
              <div className="section-divider"></div>
              <div className="section-content">
                {/* OUTSTANDING FINANCES - AI SUMMARY */}
                {aiContentList[0] ? (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[0]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                ) : (
                  <></>
                )}
                {/* OUTSTANDING FINANCES */}
                {full.FinanceRecordList.map((x, i) => {
                  return (
                    <div className="table-figure-container">
                      <table
                        style={{ width: "100%" }}
                        rules="all"
                        className="section-table"
                      >
                        <tbody>
                          {/* OUTSTANDING FINANCES - AGREEMENT DATE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Agreement Date
                            </td>
                            <td>{FormatDate(x.AgreementDate)}</td>
                          </tr>
                          {/* OUTSTANDING FINANCES - AGREEMENT NUMBER */}
                          {x.AgreementNumber !== "REDACTED" ? (
                            <tr>
                              <td className="section-table-first-column">
                                <div
                                  className="section-table-row-status"
                                  style={{
                                    backgroundColor: "rgb(225, 249, 9)",
                                    borderColor: "rgb(121, 130, 45)",
                                  }}
                                ></div>
                              </td>
                              <td className="section-table-second-column">
                                Agreement Number
                              </td>
                              <td>{x.AgreementNumber}</td>
                            </tr>
                          ) : null}
                          {/* OUTSTANDING FINANCES - AGREEMENT TERM */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Agreement Term
                            </td>
                            <td>{x.AgreementTerm}</td>
                          </tr>
                          {/* OUTSTANDING FINANCES - AGREEMENT TYPE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Agreement Type
                            </td>
                            <td>{x.AgreementType}</td>
                          </tr>
                          {/* OUTSTANDING FINANCES - CONTACT NUMBER */}
                          {x.ContactNumber !== "REDACTED" ? (
                            <tr>
                              <td className="section-table-first-column">
                                <div
                                  className="section-table-row-status"
                                  style={{
                                    backgroundColor: "rgb(225, 249, 9)",
                                    borderColor: "rgb(121, 130, 45)",
                                  }}
                                ></div>
                              </td>
                              <td className="section-table-second-column">
                                Contact Number
                              </td>
                              <td>{x.ContactNumber}</td>
                            </tr>
                          ) : null}
                          {/* OUTSTANDING FINANCES - FINANCE COMPANY */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Finance Company
                            </td>
                            <td>{x.FinanceCompany}</td>
                          </tr>
                          {/* OUTSTANDING FINANCES - VEHICLE DESCRIPTION */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Vehicle Description
                            </td>
                            <td>{x.VehicleDescription}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            </section>
            {/* STOLEN */}
            {full.Stolen ? (
              <>
                <section className="section">
                  <div className="section-title">Stolen</div>
                  <div className="section-divider"></div>
                  <div className="section-content">
                    {/* STOLEN - AI SUMMARY */}
                    {aiContentList[0] ? (
                      <div className="ai-summary-container">
                        <div className="ai-summary-content">
                          {aiContentList[0]}
                        </div>
                        <div className="ai-summary-by">Powered By ChadGPT</div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* STOLEN - SUMMARY */}
                    <div className="table-figure-container">
                      <table rules="all" className="section-table">
                        <tbody>
                          {/* STOLEN - SUMMARY - STATUS */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Status
                            </td>
                            <td>{full.StolenStatus}</td>
                          </tr>
                          {/* STOLEN - SUMMARY - CONTACT NUMBER */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Contact Number
                            </td>
                            <td>{full.StolenContactNumber}</td>
                          </tr>
                          {/* STOLEN - SUMMARY - DATE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Date
                            </td>
                            <td>{FormatDate(full.StolenDate)}</td>
                          </tr>
                          {/* STOLEN - SUMMARY - POLICE FORCE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Police Force
                            </td>
                            <td>{full.StolenPoliceForce}</td>
                          </tr>
                          {/* STOLEN - SUMMARY - INFORMATION SOURCE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Information Source
                            </td>
                            <td>{full.StolenInfoSource}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* STOLEN - MIAFTR */}
                    {full.StolenMiaftrRecordCount > 0 ? (
                      <>
                        {full.StolenMiaftrRecordList.map((x, i) => {
                          return (
                            <div className="table-figure-container">
                              <table
                                style={{ width: "100%" }}
                                rules="all"
                                className="section-table"
                              >
                                <tbody>
                                  {/* TODO: Needs to be checked and added */}
                                </tbody>
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
              </>
            ) : (
              <></>
            )}
            {/* IMPORTED / EXPORTED */}
            <section className="section">
              <div className="section-title">Import / Export</div>
              <div className="section-divider"></div>
              <div className="section-content">
                {/* IMPORTED / EXPORTED - AI SUMMARY */}
                {aiContentList[0] ? (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[1]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="table-figure-container">
                  <table rules="all" className="section-table">
                    <tbody>
                      {/* IMPORTED / EXPORTED - DATE FIRST REGISTERED */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Date First Registered
                        </td>
                        <td>{FormatDate(full.DateFirstRegistered)}</td>
                      </tr>
                      {/* IMPORTED / EXPORTED - IMPORTED */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        {full.Imported ? (
                          <>
                            <td className="section-table-second-column">
                              Import Date
                            </td>
                            <td>{FormatDate(full.ImportDate)}</td>
                          </>
                        ) : (
                          <>
                            <td className="section-table-second-column">
                              Imported
                            </td>
                            <td>False</td>
                          </>
                        )}
                      </tr>
                      {/* IMPORTED / EXPORTED - IMPORT USED BEFORE UK REGISTERATION */}
                      {full.ImportUsedBeforeUkRegistration ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Import Used before UK Registration
                          </td>
                          <td>{full.ImportUsedBeforeUkRegistration}</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* IMPORTED / EXPORTED - IMPORTED FROM OUTSIDE EU */}
                      {full.ImportedFromOutsideEu ? (
                        <tr>
                          <td className="section-table-first-column">
                            <div
                              className="section-table-row-status"
                              style={{
                                backgroundColor: "rgb(225, 249, 9)",
                                borderColor: "rgb(121, 130, 45)",
                              }}
                            ></div>
                          </td>
                          <td className="section-table-second-column">
                            Imported From Outside EU
                          </td>
                          <td>{full.ImportedFromOutsideEu}</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {/* IMPORTED / EXPORTED - EXPORTED */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        {full.Exported ? (
                          <>
                            <td className="section-table-second-column">
                              Export Date
                            </td>
                            <td>{FormatDate(full.ExportDate)}</td>
                          </>
                        ) : (
                          <>
                            <td className="section-table-second-column">
                              Exported
                            </td>
                            <td>False</td>
                          </>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            {/* WRITE OFF */}
            {full.WrittenOff !== false && full.WriteOffRecordCount !== 0 ? (
              <>
                <section className="section">
                  <div className="section-title">Write Off</div>
                  <div className="section-divider"></div>
                  <div className="section-content">
                    {/* WRITE OFF - AI SUMMARY */}
                    {aiContentList[0] ? (
                      <div className="ai-summary-container">
                        <div className="ai-summary-content">
                          {aiContentList[1]}
                        </div>
                        <div className="ai-summary-by">Powered By ChadGPT</div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* WRITE OFF - SUMMARY */}
                    <div className="table-figure-container">
                      <table rules="all" className="section-table">
                        <tbody>
                          {/* WRITE OFF - SUMMARY - DATE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Date
                            </td>
                            <td>{FormatDate(full.WriteOffDate)}</td>
                          </tr>
                          {/* WRITE OFF - SUMMARY - CATEGORY */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Category
                            </td>
                            <td>{full.WriteOffCategory}</td>
                          </tr>
                          {/* WRITE OFF - SUMMARY - RECORD COUNT */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Record Count
                            </td>
                            <td>{full.WriteOffRecordCount}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* WRITE OFF - DETAILS */}
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
                                <tbody>
                                  {/* TODO: Needs to be checked and added */}
                                </tbody>
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
              </>
            ) : (
              <></>
            )}
            {/* VIC INSPECTED */}
            {full.VicTested ? (
              <>
                <section className="section">
                  <div className="section-title">VIC Inspected</div>
                  <div className="section-divider"></div>
                  <div className="section-content">
                    {/* VIC INSPECTED - AI SUMMARY */}
                    {aiContentList[0] ? (
                      <div className="ai-summary-container">
                        <div className="ai-summary-content">
                          {aiContentList[0]}
                        </div>
                        <div className="ai-summary-by">Powered By ChadGPT</div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="table-figure-container">
                      <table rules="all" className="section-table">
                        <tbody>
                          {/* VIC INSPECTED - DATE */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Date
                            </td>
                            <td>{FormatDate(full.VicTestDate)}</td>
                          </tr>

                          {/* VIC INSPECTED - RESULT */}
                          <tr>
                            <td className="section-table-first-column">
                              <div
                                className="section-table-row-status"
                                style={{
                                  backgroundColor: "rgb(225, 249, 9)",
                                  borderColor: "rgb(121, 130, 45)",
                                }}
                              ></div>
                            </td>
                            <td className="section-table-second-column">
                              Test Result
                            </td>
                            <td>{full.VicTestResult}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <></>
            )}
            {/* IMPORTANT CHECKS */}
            <section className="section">
              <div className="section-title">
                Important Checks <br />
                <div className="section-title-sub">
                  It is important to check the following details before
                  purchasing to confirm the vehicle's identity.
                </div>
              </div>
              <div className="section-divider"></div>
              <div className="section-content">
                {/* IMPORTANT CHECKS - AI SUMMARY */}
                {aiContentList[0] ? (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[0]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="table-figure-container">
                  <table rules="all" className="section-table">
                    <tbody>
                      {/* VIC INSPECTED - VIN LAST 5 DIGITS */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          VIN Last 5 Digits
                        </td>
                        <td>{full.VinLast5}</td>
                      </tr>
                      {/* VIC INSPECTED - ENGINE NUMBER */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          Enginer Number
                        </td>
                        <td>{basic.VehicleRegistration.EngineNumber}</td>
                      </tr>
                      {/* VIC INSPECTED - V5C DATE */}
                      <tr>
                        <td className="section-table-first-column">
                          <div
                            className="section-table-row-status"
                            style={{
                              backgroundColor: "rgb(225, 249, 9)",
                              borderColor: "rgb(121, 130, 45)",
                            }}
                          ></div>
                        </td>
                        <td className="section-table-second-column">
                          V5C Date
                        </td>
                        <td>{FormatDate(full.LatestV5cIssuedDate)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            {/* ABOUT THIS REPORT */}
            <section className="section">
              <div className="section-title">About This Report</div>
              <div className="section-divider"></div>
              <div className="section-content">
                <div>Date of Registration: {FormatDate(order.dateTime)}</div>
                <br />
                <div>Report Reference: {order.orderId}</div>
              </div>
            </section>
          </div>
        ) : (
          <p>Create an Order here! TODO:</p>
        )}
      </div>
    </Box>
  );
};

export default OrderDetails;
