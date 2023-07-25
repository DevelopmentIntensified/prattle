// styles.js

const drawerWidth = 200;

export const sidebarStyles = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      bgcolor: "primary.main"
    }
  },
  listItem: {
    "&.Mui-selected": {
      bgcolor: "primary.dark"
    },
    "&:hover": {
      bgcolor: "primary.dark",
      cursor: "pointer"
    },
    padding: "5px",
    color: "black",
    textAlign: "center",
    textTransform: "uppercase",
    "&:not(:last-of-type)": {
      mb: "1px"
    }
  }
};
