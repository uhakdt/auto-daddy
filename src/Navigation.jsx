import React, { useContext, useState } from "react";
import { useLocation } from "react-router";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthAndAccount/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AuthAndAccount/AccountPage";
import TiersPage from "./pages/TiersPage";
import { useHandleLogout } from "./auxiliaryHooks/authHooks";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AppContext } from "./appContext";
import MenuIcon from "@mui/icons-material/Menu";

const Logo = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, color: "black" }}
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
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isAuthPage = location.pathname.startsWith("/auth");

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box sx={{ width: 250 }}>
      <List>
        {["Home", "Pricing", "About"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => navigate(`/${text.toLowerCase()}`)}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {user ? (
          <>
            <ListItem button onClick={() => navigate(`/account`)}>
              <ListItemText primary="Account" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Log out" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => navigate(`/auth/login`)}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => navigate(`/auth/register`)}>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      {!isAuthPage && (
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#e0e1e9", boxShadow: "none" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Logo />
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list()}
            </SwipeableDrawer>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "50px",
                display: { xs: "none", sm: "flex" },
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
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      )}
      {!isAuthPage && <Box sx={{ height: "64px" }} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tiers" element={<TiersPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default Navigation;
