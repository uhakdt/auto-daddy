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
import axios from "axios";
import { ref, getDownloadURL } from "firebase/storage";

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
  const [imageUrl, setImageUrl] = useState([]);

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

    fetchImageUrl();
  }, [orderId]);

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
                {basic.VehicleRegistration.MakeModel && (
                  <div>
                    {CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}
                  </div>
                )}
              </div>
              <div className="section-divider"></div>
              <div className="section-content">
                {free.RegistrationNumber && (
                  <div className="registration-number-container">
                    <div className="registration-number-gb">GB</div>
                    <div className="registration-number-content">
                      {free.RegistrationNumber}
                    </div>
                  </div>
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
                {aiContentList[0] && (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[0]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
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
                {aiContentList[0] && (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[1]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                )}
                <div className="table-figure-container">
                  <table rules="all" className="section-table">
                    <tbody>
                      {/* VEHICLE DETAILS - MODEL */}
                      {basic.VehicleRegistration.MakeModel && (
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
                      )}
                      {/* VEHICLE DETAILS - FUEL TYPE */}
                      {free.FuelType && (
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
                      )}
                      {/* VEHICLE DETAILS - COLOUR */}
                      {free.Colour && (
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
                      )}
                      {/* VEHICLE DETAILS - ENGINE */}
                      {free.EngineCapacity && (
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
                      )}
                      {/* VEHICLE DETAILS - GEARBOX */}
                      {basic.SmmtDetails.Transmission &&
                        basic.SmmtDetails.NumberOfGears && (
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
                              {CapitalizeEachWord(
                                basic.SmmtDetails.Transmission
                              )}
                            </td>
                          </tr>
                        )}
                      {/* VEHICLE DETAILS - ACCELERATION */}
                      {basic.TechnicalDetails.Performance.Acceleration
                        .ZeroTo60Mph && (
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
                      )}
                      {/* VEHICLE DETAILS - TOP SPEED */}
                      {basic.TechnicalDetails.Performance.MaxSpeed.Mph && (
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
                      )}
                    </tbody>
                  </table>
                  {/* VEHICLE DETAILS - FIGURE */}
                  {order.data.VehicleImages.length > 0 && (
                    <div>
                      <img width={"100%"} src={imageUrl} alt="Car" />
                    </div>
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
                {aiContentList[0] && (
                  <div className="ai-summary-container">
                    <div className="ai-summary-content">{aiContentList[0]}</div>
                    <div className="ai-summary-by">Powered By ChadGPT</div>
                  </div>
                )}
                <div className="table-figure-container">
                  <table rules="all" className="section-table">
                    <tbody>
                      {/* ENERGY & CONSUMPTION - POWER */}
                      {basic.TechnicalDetails.Performance.Power.Bhp &&
                        basic.TechnicalDetails.Performance.Power.Kw &&
                        basic.TechnicalDetails.Performance.Power.Rpm && (
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
                              Power
                            </td>
                            <td>
                              {basic.TechnicalDetails.Performance.Power.Bhp} BHP
                              {" / "}
                              {basic.TechnicalDetails.Performance.Power.Kw} KW
                              {" / "}
                              {basic.TechnicalDetails.Performance.Power.Rpm} RPM
                            </td>
                          </tr>
                        )}
                      {/* ENERGY & CONSUMPTION - TORQUE */}
                      {basic.TechnicalDetails.Performance.Torque.Nm &&
                        basic.TechnicalDetails.Performance.Torque.Rpm && (
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
                              {basic.TechnicalDetails.Performance.Torque.Nm} Nm
                              at {basic.TechnicalDetails.Performance.Torque.Rpm}{" "}
                            </td>
                          </tr>
                        )}
                      {/* ENERGY & CONSUMPTION - CYLINDERS */}
                      {basic.TechnicalDetails.General.Engine
                        .NumberOfCylinders && (
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
                      )}
                      {/* ENERGY & CONSUMPTION - URBAN */}
                      {basic.TechnicalDetails.Consumption.UrbanCold.Mpg && (
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
                      )}
                      {/* ENERGY & CONSUMPTION - EXTRA URBAN */}
                      {basic.TechnicalDetails.Consumption.ExtraUrban.Mpg && (
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
                      )}
                      {/* ENERGY & CONSUMPTION - COMBINED */}
                      {basic.TechnicalDetails.Consumption.Combined.Mpg && (
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
                      )}
                      {/* ENERGY & CONSUMPTION - CO2 EMISSIONS */}
                      {basic.TechnicalDetails.Performance.MaxSpeed.Mph && (
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
              {/* VEHICLE HISTORY - WRITE OFF */}
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
                        {/* TODO: Needs to be checked and added */}
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
