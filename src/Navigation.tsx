import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPage from "./pages/ResetPage";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";
import TiersPage from "./pages/TiersPage";
import PaymentPage from "./pages/PaymentPage";
import { useHandleLogout } from "./auxiliaryHooks/authHooks";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Typography
      variant="h4"
      component="div"
      sx={{ flexGrow: 1, pl: "100px", color: "black" }}
    >
      Auto Daddy
    </Typography>
  );
};

function Navigation() {
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
            <h1
              style={{ color: "black", paddingLeft: "50px", fontSize: "20px" }}
            >
              Auto Daddy
            </h1>
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
                  onClick={() => navigate("/login")}
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
                  onClick={() => navigate("/register")}
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}

export default Navigation;
