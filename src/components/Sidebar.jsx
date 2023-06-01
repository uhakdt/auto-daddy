import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import OrderIcon from "@mui/icons-material/Receipt";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function Sidebar({ orders, onSelectOrder }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [open, setOpen] = useState(matches);

  const toggleOpen = () => setOpen(!open);

  return (
    <Box
      sx={{
        height: "100vh",
        transition: "width 0.3s",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <IconButton onClick={toggleOpen} sx={{ alignSelf: "flex-end" }}>
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      {orders.map((order) => (
        <IconButton
          key={order.id}
          onClick={() => {
            onSelectOrder(order.id);
            console.log(order);
          }}
          sx={{
            justifyContent: "flex-start",
            textAlign: "left",
            width: "100%",
          }}
        >
          <OrderIcon />
          {open && (order?.registrationNumber || "N/A")}
        </IconButton>
      ))}
    </Box>
  );
}

export default Sidebar;
