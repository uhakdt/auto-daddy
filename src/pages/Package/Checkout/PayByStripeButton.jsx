import React from "react";
import "./PayByStripeButton.css";

const PayByStripeButton = ({ onClick }) => {
  return (
    <>
      <button className="btn-container" onClick={onClick}>
        <span className="btn-text">Pay with</span>
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/logos/visa-logo.svg.png`}
          alt="Visa"
        />
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/logos/mastercard-logo.svg.png`}
          alt="Mastercard"
        />
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/logos/apple-pay-logo.svg.png`}
          alt="Apple Pay"
        />
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/logos/google-pay-logo.svg.png`}
          alt="Google Pay"
        />
      </button>
    </>
  );
};

export default PayByStripeButton;
