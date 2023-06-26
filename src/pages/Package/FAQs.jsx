import React from "react";
import { styled } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: "#f5f5f5",
  boxShadow: "none",
  "&:hover": {
    background: "#e0e0e0",
  },
  "&.Mui-expanded": {
    background: "#a5d6a7",
  },
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-root": {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    "&.Mui-expanded": {
      minHeight: "inherit",
    },
  },
}));

const FAQs = () => {
  return (
    <div className="faqs-container">
      <h3>FAQs</h3>
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How do I get started?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Enter a vehicle registration number to get started. We will search
            our database for the vehicle. Once found, you can purchase the full
            vehicle history, you can do so by clicking the "Buy Full Package"
            button.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
      {/* Add more StyledAccordion elements for more FAQs */}
    </div>
  );
};

export default FAQs;
