import React from "react";
import "./PayByStripeButton.css";

const PayByStripeButton = ({ onClick }) => {
  return (
    <>
      <button className="btn-container" onClick={onClick}>
        <span className="btn-text">Pay with</span>
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/logos/visa-logo.png`}
          alt="Visa"
        />
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/logos/mastercard-logo.png`}
          alt="Mastercard"
        />
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/logos/applepay-logo.svg`}
          alt="Apple Pay"
        />
        <img
          className="logo"
          src={`${process.env.PUBLIC_URL}/logos/googlepay-logo.png`}
          alt="Google Pay"
        />
      </button>
    </>
  );
};

export default PayByStripeButton;
