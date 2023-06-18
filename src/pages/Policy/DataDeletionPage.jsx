import React from "react";
import "./PolicyPageStyles.css";

const DataDeletionPage = () => {
  return (
    <div className="page">
      <h1>Data Deletion Policy</h1>
      <p>
        At AutoDaddy, we respect your right to control your personal data. This
        right is often referred to as the ‘right to erasure’ or the ‘right to be
        forgotten’. In certain circumstances, you can request that we erase the
        data we hold about you.
      </p>

      <h2>When Can You Request Data Deletion?</h2>
      <p>
        You can request your data to be deleted under the following
        circumstances:
      </p>
      <ul>
        <li>
          We no longer need your data for the original reason we collected or
          used it.
        </li>
        <li>
          You initially gave consent for us to use your data but have now
          withdrawn that consent.
        </li>
        <li>
          You have objected to the use of your data, and your interests outweigh
          those of AutoDaddy using it.
        </li>
        <li>We have collected or used your data unlawfully.</li>
        <li>We are legally obligated to erase your data.</li>
      </ul>

      <h2>How to Request Data Deletion?</h2>
      <p>
        To request data deletion, you can contact any part of our organization.
        We accept both verbal and written requests, but we recommend following
        up verbal requests in writing to ensure clear communication. We aim to
        respond within one calendar month.
      </p>

      <h2>Exemptions</h2>
      <p>
        There are circumstances in which we may legally refuse your data
        deletion request. This could be due to reasons of freedom of expression
        and information, our legal obligations, public interest, or the
        establishment, exercise or defence of legal claims.
      </p>
      <p>
        We can also refuse your request if it is ‘manifestly unfounded or
        excessive’. In such cases, we may request a reasonable fee to handle the
        request or refuse to deal with the request altogether. We will
        communicate and justify our decision to you.
      </p>

      <h2>Complaints and Concerns</h2>
      <p>
        If you are unsatisfied with how we handle your request, we encourage you
        to raise a complaint with us first. If you remain dissatisfied, you can
        make a complaint to the ICO or seek to enforce your rights through the
        courts.
      </p>
    </div>
  );
};

export default DataDeletionPage;
