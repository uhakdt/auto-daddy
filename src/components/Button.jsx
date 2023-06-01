import React from "react";
import "./Button.css";

const Button = ({ children, onClick }) => {
  return (
    <div className="sidebar-button" onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
