import React from "react";
import "../OrderDetails.css";
import AISummaryComponent from "./AISummaryComponent";

const AIMainSummary = ({ aiContent, aiContentLoading }) => {
  return (
    <section className="section">
      <div className="section-title">AutoDaddy AI Summary</div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />
      </div>
    </section>
  );
};

export default AIMainSummary;
