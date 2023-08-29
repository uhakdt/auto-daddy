import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#e0e1e9", p: 2 }} className="footer">
      <Box className="footer-links">
        <Link to="/privacy">Privacy</Link> <Link to="/terms">Terms</Link>{" "}
        <Link to="/cookies">Cookies</Link>{" "}
        <Link to="/data-deletion">Data Deletion</Link>{" "}
        <Link to="/gdpr">GDPR</Link>{" "}
        <Link to="/money-back">Money Back Guarantee</Link>{" "}
        <a href="mailto:main@autodaddy.co.uk">Contact Us</a>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Auto Daddy. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
