import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import "./ReferralCodeModal.css";

const ReferralCodeModal = ({ isOpen, onClose }) => {
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const user = auth.currentUser;
  const email = user ? user.email : null;
  const uid = user ? user.uid : null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user) {
      const apiUrl =
        process.env.REACT_APP_API_URL + "/referral/send_referral_link";
      const payload = {
        uid: uid,
        email: email,
        sortCode: sortCode,
        accountNumber: accountNumber,
      };

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to send referral link");
        }

        console.log("Referral link sent successfully");
      } catch (error) {
        console.error("Error sending referral link:", error);
      }
    }

    onClose();
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("referral-modal-backdrop")) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="referral-modal-backdrop">
      <div className="referral-modal">
        <div className="referral-modal-header">
          <div>Get Referral Link</div>
        </div>
        <form onSubmit={handleSubmit} className="referral-form-content">
          <div className="referral-input-field">
            <input
              type="text"
              placeholder="Sort Code"
              value={sortCode}
              onChange={(e) => setSortCode(e.target.value)}
              required
            />
          </div>
          <div className="referral-input-field">
            <input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="referral-submit-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralCodeModal;
