import React, { useState } from "react";
import "./MainStatusBar.css";

function MainStatusBar({ allStatusGood }) {
  let green = "#32ce57";
  let red = "#fd4438";

  return (
    <div
      className="main-status-bar"
      style={{ backgroundColor: allStatusGood ? green : red }}
    >
      {allStatusGood ? (
        <span className="bold">ALL GOOD</span>
      ) : (
        <>
          <span className="bold">Caution: </span>
          <span>
            Car history check revealed concerns. Please review before purchase.
          </span>
        </>
      )}
    </div>
  );
}

export default MainStatusBar;
