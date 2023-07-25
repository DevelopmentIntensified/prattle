import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
interface NavProps {
  routes: string[][];
  profileRoute: string;
  logoutRoute: string;
  loginRoute: string;
  loggedIn: boolean;
}
// This component renders the right icon depending on the route and whether the user is logged in or not
const RightIcon = ({
  profileRoute,
  logoutRoute,
  loginRoute,
  loggedIn
}: Omit<NavProps, "routes">) => {
  const location = useLocation().pathname.split("/");
  if (location[1] === profileRoute.split("/")[1] && loggedIn) {
    return (
      <IconButton
        color="inherit"
        to={logoutRoute}
        component={Link}
        size="large"
      >
        <LogoutIcon />
      </IconButton>
    );
  } else if (loggedIn) {
    return (
      <IconButton
        color="inherit"
        to={profileRoute}
        component={Link}
        size="large"
      >
        <AccountCircleIcon />
      </IconButton>
    );
  }
  return (
    <IconButton color="inherit" to={loginRoute} component={Link} size="large">
      <LoginIcon />
    </IconButton>
  );
};
export const Nav = ({
  routes,
  profileRoute,
  loginRoute,
  logoutRoute,
  loggedIn
}: NavProps) => {
  // State to keep track of whether the sidebar is open or not
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation().pathname.split("/");
  const theme = useTheme();
  // Function to toggle the sidebar open/closed
  const toggleDrawer =
    (open) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenSidebar(open);
    };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={toggleDrawer(true)}
          edge="start"
          sx={{ marginRight: theme.spacing(2) }}
          color="inherit"
          aria-label="menu"
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {location[1].charAt(0).toUpperCase() + location[1].slice(1)}
        </Typography>
        <RightIcon {...{ profileRoute, loginRoute, logoutRoute, loggedIn }} />
      </Toolbar>
      <Sidebar
        openSidebar={openSidebar}
        toggleSidebar={toggleDrawer}
        routes={routes}
      />
    </AppBar>
  );
};
