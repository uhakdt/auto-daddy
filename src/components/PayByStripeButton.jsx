import React from "react";
import "./PayByStripeButton.css";

const PayByStripeButton = ({ onClick }) => {
  return (
    <>
      <button className="btn-container" onClick={onClick}>
        <span className="btn-text">Pay with</span>
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/visa-logo.svg.png`}
          alt="Visa"
        />
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/mastercard-logo.svg.png`}
          alt="Mastercard"
        />
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/apple-pay-logo.svg.png`}
          alt="Apple Pay"
        />
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/google-pay-logo.svg.png`}
          alt="Google Pay"
        />
      </button>
    </>
  );
};

export default PayByStripeButton;
