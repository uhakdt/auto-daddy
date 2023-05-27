import React, { useContext } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthAndAccount/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AuthAndAccount/AccountPage";
import TiersPage from "./pages/TiersPage";
import { useHandleLogout } from "./auxiliaryHooks/authHooks";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { AppContext } from "./appContext";

const Logo = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, pl: "100px", color: "black" }}
      >
        Auto Daddy
      </Typography>
    </Link>
  );
};

function Navigation() {
  const { previousPage, setPreviousPage } = useContext(AppContext);
  const [user, loading] = useAuthState(auth);
  const handleLogout = useHandleLogout();
  const navigate = useNavigate();

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#e0e1e9", boxShadow: "none" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Logo />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "50px",
            }}
          >
            <Button
              color="inherit"
              onClick={() => navigate("/")}
              sx={{ color: "black", fontSize: "14px", mr: "16px" }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/tiers")}
              sx={{ color: "black", fontSize: "14px", mr: "16px" }}
            >
              Pricing
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/about")}
              sx={{ color: "black", fontSize: "14px", mr: "16px" }}
            >
              About
            </Button>
            {user ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/account")}
                  sx={{
                    color: "black",
                    fontSize: "14px",
                    mr: "16px",
                    display: { xs: "none", sm: "inline-flex" },
                  }}
                >
                  Account
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    color: "black",
                    fontSize: "14px",
                    display: { xs: "none", sm: "inline-flex" },
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/auth/login");
                    setPreviousPage("/");
                  }}
                  sx={{
                    color: "black",
                    fontSize: "14px",
                    mr: "16px",
                    display: { xs: "none", sm: "inline-flex" },
                  }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/auth/register");
                    setPreviousPage("/");
                  }}
                  sx={{
                    color: "black",
                    fontSize: "14px",
                    display: { xs: "none", sm: "inline-flex" },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "64px" }} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tiers" element={<TiersPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/auth/*" element={<AuthPage />} />{" "}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default Navigation;
