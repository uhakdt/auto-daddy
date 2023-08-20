import React, { useState } from "react";
import "./MainStatusBar.css";

function MainStatusBar({ allStatusGood }) {
  return { allStatusGood } ? (
    <div
      className="main-status-bar"
      style={{ backgroundColor: allStatusGood ? "#32ce57" : "#fd4438" }}
    >
      <span className="bold">Caution: </span>
      <span>
        Car history check revealed concerns. Please review before purchase.
      </span>
    </div>
  ) : (
    <div
      className="main-status-bar"
      style={{ backgroundColor: allStatusGood ? "#32ce57" : "#fd4438" }}
    >
      <span className="bold">ALL GOOD</span>
    </div>
  );
}

export default MainStatusBar;
