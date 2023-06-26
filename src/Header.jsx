import React, { useState, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHandleLogout } from "./hooks/authHooks";
import { useNavigate } from "react-router-dom";
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
import { auth } from "./firebase";
import { AppContext } from "./appContext";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

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

function Header() {
  const { previousPage, setPreviousPage } = useContext(AppContext);
  const [user, loading] = useAuthState(auth);
  const handleLogout = useHandleLogout();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        {user ? (
          <>
            <ListItem
              onClick={() => {
                navigate(`/dashboard`);
                toggleDrawer(false)();
              }}
            >
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              onClick={() => {
                handleLogout();
                toggleDrawer(false)();
              }}
            >
              <ListItemText primary="Log out" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              onClick={() => {
                navigate(`/auth/login`);
                toggleDrawer(false)();
              }}
            >
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              onClick={() => {
                navigate(`/auth/register`);
                toggleDrawer(false)();
              }}
            >
              <ListItemText className="auth__btn" primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
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
          {loading ? null : user ? (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/dashboard")}
                sx={{
                  color: "black",
                  fontSize: "14px",
                  mr: "16px",
                }}
              >
                Dashboard
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
              <button
                className="auth__btn"
                onClick={() => {
                  navigate("/auth/register");
                  setPreviousPage("/");
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
