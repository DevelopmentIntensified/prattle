// Sidebar.js
import { Drawer, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { sidebarStyles } from "./Nav.styles"; // added import statement

function Sidebar({ openSidebar, toggleSidebar, routes }) {
  return (
    <>
      {/* Add Drawer component */}
      <Drawer
        sx={{ ...sidebarStyles.drawer }}
        anchor="left"
        open={openSidebar}
        onClose={toggleSidebar(false)}
      >
        {routes.map((r) => (
          <ListItem
            key={r[1]}
            to={r[1]}
            component={Link}
            sx={{ ...sidebarStyles.listItem }}
          >
            <ListItemText primary={r[0]} />
          </ListItem>
        ))}
      </Drawer>
    </>
  );
}

export default Sidebar;
