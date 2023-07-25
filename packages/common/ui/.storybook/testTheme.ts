import { ThemeOptions, createTheme } from "@mui/material/styles";

export const defaultTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#03a9f4"
    },
    secondary: {
      main: "#fdd835"
    }
  }
});
