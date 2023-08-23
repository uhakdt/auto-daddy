import React, { useEffect } from "react";
import "./GradientLine.css";

function GradientLine() {
  useEffect(() => {
    const handleScroll = () => {
      let scrollPercent = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
      let colorChange = Math.min(1, scrollPercent * 2); 

      let newColor = `linear-gradient(to bottom, 
        rgba(${hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--dark-purple').trim()).r}, 
             ${hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--dark-purple').trim()).g}, 
             ${hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--dark-purple').trim()).b}, 
             ${1 - colorChange}), 
        rgba(${hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--orange').trim()).r}, 
             ${hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--orange').trim()).g}, 
             ${hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--orange').trim()).b}, 
             ${colorChange}))`;

      document.body.style.setProperty("--scroll-gradient", newColor);
    }

    const hexToRgb = (hex) => {
      hex = hex.replace(/^#/, '');
      let bigint = parseInt(hex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;

      return { r: r, g: g, b: b };
    }

    window.addEventListener("scroll", handleScroll);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return <div className="gradient-line"></div>;
}

export default GradientLine;
